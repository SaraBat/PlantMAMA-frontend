/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import plants from 'reducers/plants';

export const EditPlantProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  // making sure the selected image can be used later in the code
  const fileInput = useRef();
  const { plantId } = useParams();
  const [plantname, setPlantname] = useState('');
  const [species, setSpecies] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [birthday, setBirthday] = useState('');
  // dispatch to put access token into main component
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(plantId);

  const onBackClick = () => {
    navigate(-1);
  };

  const onFormSubmit = (event) => {
    // form not to reload page
    event.preventDefault();
    // constructing a form-data-object and appending all
    // editable plant attributes to it (file and text formats)
    const formData = new FormData();
    formData.append('plantname', plantname)
    formData.append('species', species)
    formData.append('birthday', birthday)
    // set the key in the patch-request to "image" and the value to the uploaded image
    formData.append('image', fileInput.current.files[0])
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: accessToken
      },
      body: formData
    };
    const url = API_URL(`${username}/garden/${plantId}`);
    const request = new Request(url, options);
    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(plantId);
        console.log(plantname);
        console.log(species);
        console.log(birthday);
        navigate(-2)
        // eslint-disable-next-line max-len
        dispatch(
          plants.actions.editSinglePlant(
            { plantId: plantId,
              plantname: plantname,
              species: species,
              birthday: birthday,
              imageUrl: imageUrl }
          )
        );
        console.log('dispatch sent');
        dispatch(plants.actions.setError(null));
      });
  };
  const onDeletePlantClick = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    // eslint-disable-next-line space-unary-ops
    fetch(API_URL(`${username}/garden/${plantId}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate(-2)
        dispatch(plants.actions.deleteSinglePlant(plantId));
        dispatch(plants.actions.setError(null));
      });
  };
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="plantnamee"> Change plantname </label>
        <input
          type="text"
          id="plantname"
          value={plantname}
          onChange={(e) => setPlantname(e.target.value)} /><br /><br />
        <label htmlFor="species"> Change species </label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)} /><br /><br />
        <label htmlFor="birthday"> Change birthday </label>
        <input
          type="date"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)} /><br /><br />
        <label htmlFor="imageUrl"> Change picture </label>
        <input
          type="file"
          id="imageUrl"
          placeholder="Add plant photo"
          ref={fileInput}
          onChange={(e) => setImageUrl(e.target.files[0])} /><br /><br />
        <button type="submit"> Submit </button>
      </form>
      <button
        type="button"
        onClick={onDeletePlantClick}> Delete Plant
      </button>
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </>
  )
}