import axios from 'axios';
import useStore from '../../zustand/store';
import { useState } from 'react';

function UpdateProfile() {
  
const user = useStore((state) => state.user);

const [ updatePlayerProfile, setUpdatePlayerProfile ] = useState( { id: user.id, username: user.username, email: user.email, city: user.city, zip: user.zip, greeting: user.greeting, playing_hand: user.playing_hand, racquet_brand: user.racquet_brand });

console.log("in UpdateProfile", updatePlayerProfile)

const update=(e)=>{
axios.put(`/api/update_profile`, updatePlayerProfile )
.then(( response  )=>{
  console.log( "response from update", response.data );
}).catch(( err )=>{
  console.log("error in UpdateProfile", err );
});
};

  return (
     <div className='UpdateProfile'>
      <form>
        <p>Username:<input className="tennis-green" type="text" placeholder={ user.username } onChange={(e)=>{ setUpdatePlayerProfile({ ...updatePlayerProfile, username: e.target.value })}} /></p>
        <p>Zip:<input className="tennis-green" type="text" placeholder={ user.zip } onChange={(e)=>{ setUpdatePlayerProfile({ ...updatePlayerProfile, zip: e.target.value })}} /></p>
        <p>Greeting:<input className="tennis-green" type="text" placeholder={ user.greeting } onChange={(e)=>{ setUpdatePlayerProfile({ ...updatePlayerProfile, greeting: e.target.value })}} /></p>
        <p>Playing Hand: { user.playing_hand }</p>  
        <select className="tennis-green" onChange={(e)=>{setUpdatePlayerProfile({ ...updatePlayerProfile, playing_hand: e.target.value})}} >
          <option value="">Playing Hand</option>
          <option value="Right" >Right</option>
          <option value="Left">Left</option>
        </select>
        <p>Racquet Brand: { user.racquet_brand }</p>
        <select className="tennis-green" onChange={(e)=>{setUpdatePlayerProfile({ ...updatePlayerProfile, racquet_brand: e.target.value})}} >
          <option value=''>Racquet Brand</option>
          <option value="Wilson" >Wilson</option>
          <option value="Babolat">Babolat</option>
          <option value="Yonex">Yonex</option>
          <option value="Head" >Head</option>
          <option value="Technifibre" >Technifibre</option>
          <option value="Artengo">Artengo</option>
          <option value="Diadem">Diadem</option>
          <option value="Prince">Prince</option>
        </select>
        <button onClick={ update }>Update Profile</button>    
      </form>
    </div>
  );
  }

export default UpdateProfile;
