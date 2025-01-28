import React, { useState, useEffect } from "react";

import axios from "axios";

import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
  const [userData, setUserdata] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null); // Track the selected chat
  const [isGroupChat, setIsGroupChat] = useState(false);

  useEffect(() => {
    const userdata = localStorage.getItem("user");

    if (userdata) {
      try {
        const parsedUser = JSON.parse(userdata);
        setUserdata(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
      navigate("/login");
    }
  }, [navigate]);

  console.log("userData", userData);

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
    if (userData) {
      // Fetch users
      axios
        .get("https://api.proleverageadmin.in/api/users/Allusers")
        .then((response) => {
          console.log("yogi ", response);
          const userList = response.data.allUsers.filter(
            (user) => user._id !== userData?._id
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
          params: { userID: userData?._id },
        })
        .then((response) => {
          setGroups(response.data);
        })
        .catch((err) => console.error("Error fetching groups:", err));
    }
  }, [userData]);

  console.log("setGroups", groups);

  useEffect(() => {
    if (userData) {
      socket.emit("register-socket", userData);

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
  }, [userData, receiverID]);

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
      senderID: userData?._id,
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
    setSelectedChat({ id, name });
    setIsGroupChat(isGroup);
    setNotifications((prev) => {
      const updatedNotifications = { ...prev };
      delete updatedNotifications[id];
      return updatedNotifications;
    });

    const backToList = () => {
      setSelectedChat(null);
    };

    const endpoint = isGroup
      ? "https://api.proleverageadmin.in/api/group/group-chat-history"
      : "https://api.proleverageadmin.in/api/message/chat-history";
    const params = isGroup
      ? { groupID: id }
      : { userID: userData?._id, contactID: id };

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
    setSelectedMembers([userData?._id]);
  }, [userData?._id]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      <i
        onClick={handleGoBack}
        className="fa-solid fa-arrow-left-long mb-3 mt-4 mx-3"
        style={{
          backgroundColor: "#007bff",
          padding: "10px",
          color: "white",
          borderRadius: "50%",
          fontSize: "20px",
          textAlign: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#0056b3";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#007bff";
          e.target.style.transform = "scale(1)";
        }}
      ></i>
      <div className="chat-container web-tools">
        <div className="chat">
          <div className="chat-sidebar">
            <h3 className="poppins-regular">
              Welcome, <span>{userData?.username}</span>
            </h3>
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
                </div>
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.senderID === userData?._id ? "sent" : "received"
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
        </div>
      </div>

      <div className="chat-container mobile-tools m-3">
        {selectedChat ? (
          // Chat View
          <div className="chat-main">
            <div className="chat-header">
              {/* <button className="back-button" onClick={backToList}>
                Back
              </button> */}
              <h3 className="poppins-regular">Chat with {selectedChat.name}</h3>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message poppins-regular ${
                    msg.senderID === userData?._id ? "sent" : "received"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="poppins-regular"
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        ) : (
          // List View
          <div className="" style={{ padding: "20px" }}>
            <div className="">
              <h3 className="poppins-regular mt-3">
                Welcome, <span>{userData?.username}</span>
              </h3>
            </div>
            <div className="user-list">
              {groups.map((group) => (
                <div
                  key={group._id}
                  className="user-item poppins-regular"
                  onClick={() => openChat(group._id, group.groupName, true)}
                  style={{
                    backgroundColor: "lightgrey",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {group.groupName}
                </div>
              ))}

              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="user-item poppins-regular"
                  style={{
                    backgroundColor: "lightgrey",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={() => openChat(user._id, user.username, false)}
                >
                  {user.username}
                  {notifications[user._id] && (
                    <span className="notification-badge">
                      {notifications[user._id]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatApp;
