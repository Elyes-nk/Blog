import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  const PublicFolder = "http://localhost:5000/img/";
  return (
    <div className="post">
      {/* if */}
      {post.photo && (
        <img
        className="postImg"
        src={PublicFolder + post.photo}
        alt=""
      />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cat) =>(
              <span className="postCat">
              <Link className="link" to={`/?cat=${cat.name}`}>
                {cat.name}
              </Link>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
       {post.desc}
      </p>
    </div>
  );
}
