import { useContext, useEffect, useState } from "react";
import PostBox from "Components/posts/PostBox";
import PostForm from "Components/posts/PostForm";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileImage?: string;
  likes?: string[];
  likesCount?: number;
  comments?: any;
}

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "postData");
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

      onSnapshot(postsQuery, (snapshot) => {
        const dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, []);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div className="home__tab home__tab--active">For you</div>
          <div className="home__tab">Following</div>
        </div>
      </div>
      <PostForm />
      <div className="post">
        {posts?.length > 0 ? (
          posts.map((post) => <PostBox post={post} key={post?.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
function useAuthContext(): { user: any } {
  throw new Error("Function not implemented.");
}
