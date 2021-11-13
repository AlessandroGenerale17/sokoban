import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import clickSound from "../../assets/sounds/switch33.ogg";
import { selectAllThemes, selectTheme } from "../../store/theme/selectors";
import { setSelectedTheme } from "../../store/theme/actions";
import "./menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const [audioPlaying, setAudioPlaying] = useState({});
  const [themeIndex, setThemeIndex] = useState(0);

  const allThemes = useSelector(selectAllThemes());
  const theme = useSelector(selectTheme());
  const dispatch = useDispatch();

  const playSound = (key) => {
    if (audioPlaying[key]) {
      audioPlaying[key].pause();
      audioPlaying[key].currentTime = 0;
    }
    audioPlaying[key].play();
  };

  const handleClick = (i) => {
    const index = themeIndex + i;
    if (index === allThemes.length) {
      setThemeIndex(0);
      dispatch(setSelectedTheme(allThemes[0]));
    } else if (index < 0) {
      setThemeIndex(allThemes.length - 1);
      dispatch(setSelectedTheme(allThemes[allThemes.length - 1]));
    } else {
      setThemeIndex(index);
      dispatch(setSelectedTheme(allThemes[index]));
    }
    playSound("click");
  };

  useEffect(() => {
    setAudioPlaying({
      click: new Audio(clickSound),
    });
  }, []);

  return (
    <div
      className="menuBox"
      style={{
        background: `url(${theme.floor})`,
      }}
    >
      <h1>Sokoban</h1>

      <h3>Select level:</h3>
      <select
        name="level"
        id="level"
        onChange={(event) => {
          navigate(`/game/${event.target.value}`);
        }}
      >
        <option>...</option>
        <option value="1">level 1</option>
        <option value="2">level 2</option>
        <option value="3">level 3</option>
      </select>

      <h3>Select theme:</h3>

      <div className="themeSelector">
        <p>{theme.theme}</p>
        <div className="themes">
          <button onClick={() => handleClick(-1)}>&lt;</button>
          <img src={theme.character_1} alt={theme.name}></img>
          <button onClick={() => handleClick(1)}>&gt;</button>
        </div>
      </div>

      <h3>Top scores:</h3>
    </div>
  );
}
