import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../helpers/AuthContext";

function Post({ user }) {
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  let { id } = useParams();
  let { authState } = useContext(AuthContext);

  const initialValues = {
    commentText: "",
  };

  const onSubmit = (data, { resetForm }) => {
    const submitObject = {
      ...data,
      username: user || "anonymous",
      PostId: id,
    };
    axios
      .post("http://localhost:3001/comments", submitObject, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCommentData([...commentData, submitObject]);
          resetForm();
        }
      });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comments/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setCommentData(commentData.filter((val) => {
        return val.id !== id;
      }))
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPostData(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setCommentData(response.data);
      console.log("Fetch comments");
    });
  }, []);
  return (
    <>
      <div className="p-4 w-4/6 shadow-lg my-5 rounded-xl">
        <div className="my-2 p-2 font-bold bg-gray-800 text-blue-gray-200 rounded">
          {postData.title}
        </div>
        <div className="border-2 border-violet-600 rounded p-2">
          {postData.postText}
        </div>
        <div className="text-sm">{`@${postData.username}`}</div>
      </div>
      {localStorage.getItem("accessToken") && (
        <div className="p-4 w-1/2 shadow-lg rounded-xl">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="flex flex-col gap-6">
              <Field
                component="textarea"
                className="rounded-xl"
                name="commentText"
                placeholder="add a comment..."
                autoComplete="off"
              />
              <Button className="my-5" type="submit">
                Add Comment
              </Button>
            </Form>
          </Formik>
        </div>
      )}
      <div className="p-4 w-1/2 shadow-lg rounded-xl">
        <span className="text-2xl">Comment Section</span>
        {commentData.map((comment, idx) => {
          return (
            <div key={idx} className="p-2 w-4/5 shadow-sm">
              {`@${comment.username}`}
              <p>{`${comment.commentText}`}</p>
              {authState.username === comment.username && (
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                  className="shadow-sm bg-blue-gray-300 rounded-md p-2"
                >
                  x
                </button>
              )}
            </div>
          );
        })}
        <div className="p-2 w-4/5 shadow-sm"></div>
      </div>
    </>
  );
}

export default Post;
