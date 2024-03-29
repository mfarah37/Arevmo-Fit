import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import WorkoutsPage from '../WorkoutsPage/WorkoutsPage';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import{ getUser } from '../../utilities/users-service'
import QrScanPage from '../QrScanPage/QrScanPage';
import ExerciseShowPage from '../ExerciseShowPage/ExerciseShowPage';
import UserExerciseShowPage from '../UserExerciseShowPage/UserExerciseShowPage';
import NewExercisePage from '../NewExercisePage/NewExercisePage';
import SettingsPage from '../SettingsPage/SettingsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import InitUserPage from '../InitUserPage/InitUserPage';

export default function App() {
  const [user, setUser] = useState(getUser()) 
  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            {
              user.isAdmin === true ?
              <>
                <Route path="/qr" element={<QrScanPage user={user}/>} />
                <Route path="/exercises/new" element={<NewExercisePage user={user} />} />
                <Route path="/exercises/:exerciseId" element={<ExerciseShowPage user={user} />} />
                <Route path="/*" element={<Navigate to="/qr" />} />
              </>
              :
            
              user.height ?
                <>
                  <Route path="/updateuser" element={<InitUserPage user={user} setUser={setUser}/>} />
                </>
                :
                <>
                  <Route path="/workouts" element={<WorkoutsPage />} />
                  <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/qr" element={<QrScanPage user={user}/>} />
                  <Route path="/exercises/:exerciseId" element={<UserExerciseShowPage user={user}/>} />
                  <Route path="/*" element={<Navigate to="/qr" />} />
                </>
            }
          </Routes>
          <Footer user={user}/>
        </>
        :
        <AuthPage setUser={setUser} /> 
      }
    </main>
  );
}
