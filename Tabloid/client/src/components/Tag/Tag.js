import React, { useContext, useState } from 'react';
import { TagContext } from '../../providers/TagProvider';
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { useHistory, useParams } from 'react-router-dom';


export default function Tag({ tag }) {
  const { deleteTag, getAllTags } = useContext(TagContext);
  const { id } = useParams();
  const intId = parseInt(id);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const Edit = () => {
    history.push(`tags/${tag.id}/edit`)
  }

  const Delete = () => {
    deleteTag(tag.id)
      .then(toggle)
      .then(getAllTags)
  }

  return (
    <tr>
      <td>{tag.name}</td>
      <td>
        <Button color="warning" onClick={Edit}>Edit</Button>{" "}
        <Button color="danger" onClick={toggle} >Delete</Button>{" "}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Are you sure you want to delete?</ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={Delete}>Delete</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </td>
    </tr>
  );
}
