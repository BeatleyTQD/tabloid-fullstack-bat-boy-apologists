import React, { useContext, useEffect } from "react";
import Tag from "../Tag/Tag";
import { Button, Table } from "reactstrap";
import { TagContext } from "../../providers/TagProvider"
import { useHistory } from 'react-router-dom';

export default function TagList() {
  const { tags, getAllTags } = useContext(TagContext);
  const history = useHistory();

  useEffect(() => {
    getAllTags();
  }, []);

  const Create = () => {
    history.push(`tags/add`);
  }

  return (
    <div className="container">
      <h1>Tags</h1>
      <p>
        <Button color="primary" onClick={Create}>Create</Button>{" "}
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
