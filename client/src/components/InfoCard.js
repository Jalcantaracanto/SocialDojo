// import React, { useEffect, useState } from 'react'
// import '../styles/InfoCard.css'
// import { UilPen } from '@iconscout/react-unicons'
// import { ProfileModal } from './ProfileModal'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import * as UserApi from '../services/user-service'

// export const InfoCard = ({ handleDialog1Close, setModalOpen}) => {
//     // const [modalOpen, setModalOpen] = useState(false)

//     const params = useParams()
//     const profileUserId = params.id
//     const [profileUser, setProfileUser] = useState({})
//     const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER

//     const { user } = useSelector((state) => state.authReducer.authData)

//     //console.log(params)
//     //console.log(profileUserId)
//     // console.log(user._id)

//     useEffect(() => {
//         const fetchProfileUser = async () => {
//             if (profileUserId === user._id) {
//                 setProfileUser(user)
//             } else {
//                 const profileUser = await UserApi.getUser(profileUserId)
//                 setProfileUser(profileUser)
//             }
//         }
//         fetchProfileUser()
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [user])

//     const handleClick = () => {
//         setModalOpen(true)
//         handleDialog1Close()
//     }

//     return (
//         <div className="InfoCard">
//             <div className="infoHead">
//                 <h4>Profile Info</h4>
//                 {user._id === profileUserId ? (
//                     <div>
//                         {/* <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpen(true)} /> */}
//                         <UilPen width="2rem" height="1.2rem" onClick={handleClick} />
//                         <ProfileModal /* modalOpen={modalOpen} */ setModalOpen={setModalOpen} data={user} />
//                     </div>
//                 ) : (
//                     'Nothing'
//                 )}
//             </div>
//             <img src={profileUser.profilePicture ? serverUrl + profileUser.profilePicture : serverUrl + 'defaultProfile.png'} alt="" className="followerImage" />

//             <div className="info">
//                 <span>Name: </span>
//                 <span>
//                     {profileUser.firstname} {profileUser.lastname}{' '}
//                 </span>
//             </div>
//             <div className="info">
//                 <span>Email: </span>
//                 <span>{profileUser.email} </span>
//             </div>
//             <div className="info">
//                 <span>Status: </span>
//                 <span>{profileUser.relationship}</span>
//             </div>
//             <div className="info">
//                 <span>Lives in: </span>
//                 <span>{profileUser.city}</span>
//             </div>
//             <div className="info">
//                 <span>About: </span>
//                 <span>{profileUser.about}</span>
//             </div>
//             <div className="info">
//                 <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{profileUser.followings?.length}</span>
//                 <span style={{ marginLeft: '5px' }}>Followed Users</span>
//             </div>
//             <div className="vl" style={{ height: '1px', backgroundColor: '#000', margin: '10px 0' }}></div>
//             <div className="info">
//                 <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{profileUser.followers?.length}</span>
//                 <span style={{ marginLeft: '5px' }}>Followers</span>
//             </div>
//             {/* <button className="button logout-button" onClick={handleLogout}>
//                 Logout
//             </button> */}
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import '../styles/InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../services/user-service';

import { Avatar, Card, CardContent, Typography, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { ProfileModal } from './ProfileModal';

export const InfoCard = ({ handleDialog1Close, setModalOpen }) => {
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleClick = () => {
    setModalOpen(true);
    handleDialog1Close();
  };

  return (
    <Card variant="outlined" className="InfoCard">
      <CardContent>
        <Typography variant="h5">Profile Info</Typography>
        {user._id === profileUserId ? (
          <div>
            <IconButton onClick={handleClick} color="primary" size="small">
              <EditIcon />
            </IconButton>
            <ProfileModal setModalOpen={setModalOpen} data={user} />
          </div>
        ) : (
          'Nothing'
        )}
        <Avatar
          alt="Profile Picture"
          src={profileUser.profilePicture ? serverUrl + profileUser.profilePicture : serverUrl + 'defaultProfile.png'}
          sx={{ width: 100, height: 100, margin: '0 auto' }}
        />
        <div className="info">
          <span>Name:</span>
          <span>
            {profileUser.firstname} {profileUser.lastname}
          </span>
        </div>
        <div className="info">
          <span>Email:</span>
          <span>{profileUser.email}</span>
        </div>
        <div className="info">
          <span>Status:</span>
          <span>{profileUser.relationship}</span>
        </div>
        <div className="info">
          <span>Lives in:</span>
          <span>{profileUser.city}</span>
        </div>
        <div className="info">
          <span>About:</span>
          <span>{profileUser.about}</span>
        </div>
        <div className="info">
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{profileUser.followings?.length}</span>
          <span style={{ marginLeft: '5px' }}>Followed Users</span>
        </div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="info">
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{profileUser.followers?.length}</span>
          <span style={{ marginLeft: '5px' }}>Followers</span>
        </div>
      </CardContent>
    </Card>
  );
};

