'use client';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';
import From from '@components/Form';
const Edit = () => {
    const searchParams = useSearchParams(); 
    const promptId = searchParams.get("id");
    const router = useRouter();
    
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            console.log(promptId,'promptId')
                const response = await fetch(`/api/prompt/${promptId}`);
                
                const data = await response.json();

                
                setPost({
                    prompt: data.prompt,
                    tag: data.tag, 
                });
        }
        promptId && getPromptDetails();
    }, [promptId]);
    const updatePrompt = async (e) => {
        if(!promptId) return alert("Prompt ID is missing");
        console.log(post,'post here')
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt:post.prompt,  tag: post.tag}),
            });

            if(res.ok){
                router.push("/") // redirect to home page
            }
          
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <From
    type = "Edit"
    post = {post}
    setPost = {setPost}
    submitting = {submitting}
    handleSubmit = {updatePrompt}
    />
  )
}

export default Edit;