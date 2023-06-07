import { useState } from "react";

function Dialog({ message, onDialog, post_id }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/view/post/delete/${post_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Post deleted successfully");
        window.location.reload();
      } else {
        const data = await response.json();
        if (data && data.error) {
          alert(`Failed to delete post: ${data.error}`);
        } else {
          alert("Failed to delete post");
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post");
    } finally {
      setLoading(false);
      onDialog(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={() => onDialog(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ color: "#111", fontSize: "16px" }}>{message}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={handleDelete}
            className="delete-button-yes"
            disabled={loading}
          >
            {loading ? "Deleting..." : "YES"}
          </button>
          <button
            onClick={() => onDialog(false)}
            className="delete-button-no"
            disabled={loading}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
