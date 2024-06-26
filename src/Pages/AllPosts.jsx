import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../Components";
import service from "../Appwrite/config";
function AllPosts() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((post) => {
      if (post) setposts(post.documents);
    });
  }, []);
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
