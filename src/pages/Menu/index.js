import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clickSound from "../../assets/sounds/switch33.ogg";
import "./menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const [audioPlaying, setAudioPlaying] = useState({});

  const themes = [
    {
      id: 1,
      title: "dung-beetle",
      image:
        "https://thumbs.dreamstime.com/b/vector-pixel-art-beetle-isolated-vector-pixel-art-beetle-102308827.jpg",
      tile: require("../../assets/sprites/mapTile_022.png").default,
      block: require("../../assets/sprites/block_06.png").default,
    },
    {
      id: 2,
      title: "alien",
      image: require("../../assets/sprites/character_0004.png").default,
      tile: require("../../assets/sprites/mapTile_022.png").default,
      block: require("../../assets/sprites/block-border.png").default,
    },
    {
      id: 3,
      title: "star trek",
      image:
        "http://piq.codeus.net/static/media/userpics/piq_323250_400x400.png",
      tile: require("../../assets/sprites/mapTile_022.png").default,
      block: require("../../assets/sprites/block_06.png").default,
    },
  ];


	const [themeIndex, setThemeIndex] = useState(0);
	const [selectedTheme, setSelectedTheme] = useState(themes[themeIndex]);


  const playSound = (key) => {
    if (audioPlaying[key]) {
      audioPlaying[key].pause();
      audioPlaying[key].currentTime = 0;
    }
    audioPlaying[key].play();
  };

  const handleClick = (i) => {
    const index = themeIndex + i;
    if (index === themes.length) {
      setThemeIndex(0);
      setSelectedTheme(themes[0]);
    } else if (index < 0) {
      setThemeIndex(themes.length - 1);
      setSelectedTheme(themes[themes.length - 1]);
    } else {
      setThemeIndex(index);
      setSelectedTheme(themes[index]);
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
        background: `url(${selectedTheme.tile})`,
        borderImage: `url(${selectedTheme.block}) 100 round `,
      }}
    >
      <h1>Sokoban</h1>

			<h3>Select level:</h3>
			<select
				name='level'
				id='level'
				onChange={(event) => {
					navigate(`/game/${event.target.value}`);
				}}
			>
				<option>...</option>
				<option value='1'>level 1</option>
				<option value='2'>level 2</option>
				<option value='3'>level 3</option>
			</select>

			<h3>Select theme:</h3>

			<div className='themeSelector'>
				<p>{selectedTheme.title}</p>
				<div className='themes'>
					<button onClick={() => handleClick(-1)}>&lt;</button>
					<img
						src={selectedTheme.image}
						alt={selectedTheme.title}
					></img>
					<button onClick={() => handleClick(1)}>&gt;</button>
				</div>
			</div>

			<h3>Top scores:</h3>
		</div>
	);
}
