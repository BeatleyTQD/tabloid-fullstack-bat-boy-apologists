import React, { useEffect, useContext, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from "reactstrap";
import { useForm } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { PostContext } from "../../providers/PostProvider";
import { PostTagContext } from "../../providers/PostTagProvider";
import { TagContext } from "../../providers/TagProvider";



const PostTagEdit = () => {

    const [post, setPost] = useState("");
    const [isLoading, setIsLoading ] = useState("true");
    const { getPost } = useContext(PostContext);
    const { getTagsByPostId,postTags,deleteTagsByPostId,addPostTag } = useContext(PostTagContext);
    const { getAllTags, tags } = useContext(TagContext)
    const location = useLocation();
    let postId = parseInt(location.pathname.split("/")[2]);
    const history = useHistory();
    let newTags = [];

    const goBack = () => {
        history.push("/post");
    }
    const schema = Yup.object().shape({
      tag_Ids: Yup.array()
        .transform(function(o, obj) {
          return o.filter(o => o);
        })
        .min(2, "")
    });

    const { register, handleSubmit, control, getValues, setValue } = useForm({
       resolver: yupResolver(schema),
        defaultValues: Object.fromEntries(
          tags.map((tag, i) => [
            `tag.id[${i}]`,
            postTags.some(postTag => postTag.id === tags[i].id)
          ])
        )
      });


            

    const onSubmit = (data, evt) => {
        console.log("Submitting..");
        Object.keys(data).forEach(key => {
            if (data[key] !== false) {
                newTags.push(
                    {"postId": postId,
                    "tagId": parseInt(data[key])
                    })
                };   
        });
        // console.log(newTags)
        deleteTagsByPostId(postId)
        .then((p)=> {
           if (!newTags.length > 0) {
            history.push(`/post/${postId}`)
           }
           else {
            newTags.map((postTag) => {
              addPostTag(postTag)
              .then(history.push(`/post/${postId}`))
          })
           }
            
        })
        
        
      };

    
    useEffect(() => {
        getAllTags();
        getPost(postId)
        .then(setPost)
        getTagsByPostId(postId)
        setIsLoading(false);
        
    }, []);

   
   
    return !isLoading ? (
        
        <Box>
            <div className="div__tags">
                
                    <h2>{post.title}</h2>
                
            </div>
          <Paper
            
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
              <div className="div__tags__list">
            {tags.map((tag, i) => {
              return (
                <FormCheckBox
                  key={tag.id}
                  name={tag.name}
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                  value={tag.id}
                  label={tag.name}
                  register={register}
                  defaultValue={postTags.some(postTag => postTag.id === tag.id)}
                />
              );
            })}
            </div>
    
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={goBack}
              
            >
              Cancel
            </Button>
          </Paper>
        </Box>
      ):null;
    }
    
    export const FormCheckBox = ({
      name,
      value,
      register,
      control,
      setValue,
      getValues,
      defaultValue
    }) => {
      return (
        <FormControlLabel
          control={<Checkbox defaultChecked={defaultValue} />}
          name={name}
          inputRef={register}
          value={value}
          label={name}
        />
      );
    };
    
    export default PostTagEdit;