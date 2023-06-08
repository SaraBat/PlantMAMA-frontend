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
    const formData = new FormData();
    formData.append('image', fileInput.current.files[0])
    formData.append('plantname', plantname)
    formData.append('species', species)
    formData.append('birthday', birthday)
    const options = {
      method: 'PATCH',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: accessToken
      },
      // body: JSON.stringify({ plantname, species, birthday })
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
        onClick={onBackClick}> Back
      </button>
    </>
  )
}