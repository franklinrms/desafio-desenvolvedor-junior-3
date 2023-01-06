import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GoBack from "../../components/GoBack";
import api, { setToken } from "../../lib/api";
import formattedDate from "../../lib/formattedDate";
import * as S from "./style";

export default function Post() {
  const [post, setPost] = useState(null);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const getPost = async (endpoint: string) => {
    try {
      const token = localStorage.getItem("SMtoken");
      if (token) setToken(JSON.parse(token));

      const { data } = await api.get(endpoint);
      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const endpoint = `/posts/${postId}`;

    if (!post) {
      getPost(endpoint);
    }
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }
  const { title, content, subtitle, author, createdAt } = post;
  const { name, username } = author;
  return (
    <S.PostContainer>
      <div>
        <GoBack />
      </div>
      <S.PostHeader>
        <h1>{title}</h1>
        <p>{subtitle || ""}</p>
        <div className="meta">
          <div>
            <span className="label">Escrito por</span>
            <span className="value">{name || username}</span>
          </div>
          <div>
            <span className="label">Publicado em</span>
            <span className="value">{formattedDate(createdAt)}</span>
          </div>
        </div>
      </S.PostHeader>
      <S.PostContent>
        <div className="inner" dangerouslySetInnerHTML={{ __html: content }} />
      </S.PostContent>
    </S.PostContainer>
  );
}