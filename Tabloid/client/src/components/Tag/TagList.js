import React, { useContext, useEffect } from "react";
import Tag from "../Tag/Tag";
import { Button, Table } from "reactstrap";
import { TagContext } from "../../providers/TagProvider"

export default function TagList() {
  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <div className="container">
      <h1>Tags</h1>
      <p>
        <Button color="primary">Create</Button>{" "}
      </p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tag Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
