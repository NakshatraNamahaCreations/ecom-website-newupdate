import React, { useState, useEffect } from "react";

import axios from "axios";

import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import io from "socket.io-client";

const socket = io("https://api.proleverageadmin.in", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});
// Handle successful connection
socket.on("connect", () => {
  console.log("Connected to Socket.IO server:", socket.id);
});

// Handle errors
socket.on("connect_error", (err) => {
  console.error("Socket.IO connection error:", err);
});

// Listen for messages
socket.on("receive-message", (message) => {
  console.log("New message received:", message);
});

const ChatApp = () => {
  const [step, setStep] = useState("register");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState(null);
  const [loggedInUserName, setLoggedInUserName] = useState("");

  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState({});
  const [receiverID, setReceiverID] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Initialize user on app load
  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedUserName = localStorage.getItem("username");
    if (storedUserID && storedUserName) {
      setUserID(storedUserID);
      setLoggedInUserName(storedUserName);
      setStep("chat");
    }
  }, []);

  const storedUserName1 = localStorage.getItem("username");

  console.log("storedUserName", storedUserName1);

  console.log("users--------------------------------", users);
  useEffect(() => {
    if (userID) {
      // Fetch users
      axios
        .get("https://api.proleverageadmin.in/api/users/Allusers")
        .then((response) => {
          console.log("yogi ", response);
          const userList = response.data.allUsers.filter(
            (user) => user._id !== userID
          );

          setUsers(
            userList.filter((item) => item._id === "67598a2a038a302bea3b0519")
          );
          setFilteredUsers(
            userList.filter((item) => item._id === "67598a2a038a302bea3b0519")
          );
        })
        .catch((err) => console.error("Error fetching users:", err));

      // Fetch groups
      axios
        .get("https://api.proleverageadmin.in/api/group/groups", {
          params: { userID },
        })
        .then((response) => {
          setGroups(response.data);
        })
        .catch((err) => console.error("Error fetching groups:", err));
    }
  }, [userID]);

  console.log("setGroups", groups);

  useEffect(() => {
    if (userID) {
      socket.emit("register-socket", userID);

      // Listen for incoming messages
      socket.off("receive-message").on("receive-message", (newMessage) => {
        console.log("New message received:", newMessage);

        // Check if the message belongs to the current chat
        if (
          (newMessage.groupID && newMessage.groupID === receiverID) ||
          (!newMessage.groupID &&
            (newMessage.senderID === receiverID ||
              newMessage.receiverID === receiverID))
        ) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
          // Add notification for other users or groups
          const notificationID = newMessage.groupID || newMessage.senderID;
          setNotifications((prevNotifications) => ({
            ...prevNotifications,
            [notificationID]: (prevNotifications[notificationID] || 0) + 1,
          }));
        }
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [userID, receiverID]);

  const register = async () => {
    try {
      const response = await axios.post(
        "https://api.proleverageadmin.in/api/users/chat-register",
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("userID", response.data._id);
      localStorage.setItem("username", response.data.username);
      setUserID(response.data._id);
      setLoggedInUserName(response.data.username);
      setStep("chat");

      console.log("response", response);
    } catch (err) {
      alert("Registration failed");
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "https://api.proleverageadmin.in/api/users/chat-login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userID", response.data._id);
      localStorage.setItem("username", response.data.username);
      setUserID(response.data._id);
      setLoggedInUserName(response.data.username);
      setStep("chat");
    } catch (err) {
      alert("Login failed");
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const isGroup = groups.some((group) => group._id === receiverID);

    const msgData = {
      senderID: userID,
      receiverID: isGroup ? null : receiverID,
      groupID: isGroup ? receiverID : null,
      content: message,
      type: "text",
      timestamp: new Date(),
    };

    socket.emit("send-message", msgData);
    // setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  const openChat = (id, name, isGroup) => {
    setReceiverID(id);
    setReceiverName(name);
    setMessages([]);
    setNotifications((prev) => {
      const updatedNotifications = { ...prev };
      delete updatedNotifications[id];
      return updatedNotifications;
    });

    const endpoint = isGroup
      ? "https://api.proleverageadmin.in/api/group/group-chat-history"
      : "https://api.proleverageadmin.in/api/message/chat-history";
    const params = isGroup ? { groupID: id } : { userID, contactID: id };

    axios
      .get(endpoint, { params })
      .then((response) => setMessages(response.data))
      .catch((err) => console.error("Error fetching chat history:", err));
  };

  const createGroup = async () => {
    if (!groupName.trim() || selectedMembers.length === 0) {
      alert("Group name and members are required!");
      return;
    }

    try {
      const membersWithNames = selectedMembers.map((id) => {
        const user = users.find((user) => user._id === id);
        return { id, username: user?.username || "" };
      });

      const response = await axios.post(
        "https://api.proleverageadmin.in/api/group/create-group",
        {
          groupName,
          members: membersWithNames,
        }
      );
      setGroups((prev) => [...prev, response.data]);
      setGroupName("");
      setSelectedMembers([]);
      setShowGroupModal(false);
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };
  const showGroupDetails = (groupID) => {
    const group = groups.find((g) => g._id === groupID);
    if (group) {
      const memberNames = group.members
        .map((member) => member.username || member.id)
        .join(", ");
      alert(`Group: ${group.groupName}\nMembers: ${memberNames}`);
    }
  };

  const addMemberToGroup = async (groupID, newMemberID) => {
    try {
      const response = await axios.post(
        `https://api.proleverageadmin.in/api/group/add-member`,
        { groupID, newMemberID }
      );
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupID
            ? { ...group, members: response.data.members }
            : group
        )
      );
      alert("Member added successfully!");
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  const removeMemberFromGroup = async (groupID, memberID) => {
    try {
      const response = await axios.post(
        `https://api.proleverageadmin.in/api/group/remove-member`,
        { groupID, memberID }
      );
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupID
            ? { ...group, members: response.data.members }
            : group
        )
      );
      alert("Member removed successfully!");
    } catch (err) {
      console.error("Error removing member:", err);
    }
  };

  const deleteGroup = async (groupID) => {
    try {
      await axios.delete(
        `https://api.proleverageadmin.in/api/group/delete-group/${groupID}`
      );
      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupID)
      );
      alert("Group deleted successfully!");
    } catch (err) {
      console.error("Error deleting group:", err);
    }
  };

  useEffect(() => {
    setSelectedMembers([userID]);
  }, [userID]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="chat-container">
      {step === "register" && (
        <div className="auth-form">
          <h2>Register</h2>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={register}>Register</button>
          <p>
            Already have an account?{" "}
            <span onClick={() => setStep("login")} className="auth-link">
              Login here
            </span>
          </p>
        </div>
      )}

      {step === "login" && (
        <div className="auth-form">
          <h2>Login</h2>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
          <p>
            Don't have an account?{" "}
            <span onClick={() => setStep("register")} className="auth-link">
              Register here
            </span>
          </p>
        </div>
      )}

      {step === "chat" && (
        <div className="chat">
          <div className="chat-sidebar">
            <h3 className="poppins-regular">
              Welcome, <span>{loggedInUserName}</span>
            </h3>
            {/* <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search users..."
              className="user-search"
            /> */}
            {/* <button onClick={() => setShowGroupModal(true)}>
              Create Group
            </button> */}
            <div className="user-list">
              <h4 className="poppins-regular" style={{ fontSize: "16px" }}>
                Groups
              </h4>
              {groups.map((group) => (
                <div key={group._id} className="group">
                  <div
                    className={`user poppins-regular ${
                      group._id === receiverID ? "active-user" : ""
                    }`}
                    onClick={() => openChat(group._id, group.groupName, true)}
                  >
                    {group.groupName}
                  </div>
                </div>
              ))}
              <h4 className="poppins-regular" style={{ fontSize: "16px" }}>
                Users
              </h4>
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`user ${
                    user._id === receiverID ? "active-user" : ""
                  }`}
                  onClick={() => openChat(user._id, user.username)}
                >
                  {user.username}
                  {notifications[user._id] && (
                    <span className="notification-badge poppins-regular">
                      {notifications[user._id]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="chat-main">
            {receiverID ? (
              <>
                <div className="chat-header">
                  <h3 className="poppins-regular" style={{ fontSize: "16px" }}>
                    Chat with {receiverName}
                  </h3>
                  {/* {groups.some((group) => group._id === receiverID) && (
                    <div className="group-controls">
                      <button onClick={() => showGroupDetails(receiverID)}>
                        Details
                      </button>
                      <button
                        onClick={() =>
                          addMemberToGroup(
                            receiverID,
                            prompt("Enter Member ID:")
                          )
                        }
                      >
                        Add Member
                      </button>
                      <button
                        onClick={() =>
                          removeMemberFromGroup(
                            receiverID,
                            prompt("Enter Member ID:")
                          )
                        }
                      >
                        Remove Member
                      </button>
                      <button onClick={() => deleteGroup(receiverID)}>
                        Delete
                      </button>
                    </div>
                  )} */}
                </div>
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.senderID === userID ? "sent" : "received"
                      }`}
                    >
                      <span className="poppins-regular">{msg.content}</span>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="poppins-regular"
                  />
                  <button className="poppins-regular" onClick={sendMessage}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <p className="poppins-regular">
                Select a user or group to start chatting
              </p>
            )}
          </div>

          {/* Group Modal */}
          <Modal show={showGroupModal} onHide={() => setShowGroupModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Create Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                className="form-control mb-3"
              />
              <h5>Select Members</h5>
              {users.map((user) => (
                <div key={user._id} className="d-flex align-items-center mb-2">
                  <input
                    type="checkbox"
                    value={user._id}
                    checked={selectedMembers.includes(user._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers((prev) => [...prev, user._id]);
                      } else {
                        setSelectedMembers((prev) =>
                          prev.filter((id) => id !== user._id)
                        );
                      }
                    }}
                  />
                  <span className="ms-2">{user.username}</span>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowGroupModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={createGroup}>
                Create Group
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
