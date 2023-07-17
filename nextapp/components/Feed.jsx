'use client'
import React from "react";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="prompt_layout mt-16">
        {data.map((post) => (
            <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            />
        ))}
        </div>
    );
}
const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const handleSearchChange = (e) => {

    }
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/prompt");
            const data = await res.json();
            console.log(data);
            setPosts(data);
        }
        fetchPosts();
    }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={(tag) => console.log(tag)}
      />
    </section>
  );
};

export default Feed;
