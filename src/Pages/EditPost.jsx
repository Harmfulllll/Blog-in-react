import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../Components";
import service from "../Appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setposts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      service.getPost().then((post) => {
        if (post) setposts(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <Container>
      <PostCard {...post} />
    </Container>
  ) : null;
}
export default EditPost;
