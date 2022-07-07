import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { device } from "../utils/device";

const Recipe = () => {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails(params.name);

    return () => {};
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => {
            setActiveTab("instructions");
          }}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => {
            setActiveTab("ingredients");
          }}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }

  @media ${device.desktop} {
    flex-direction: row;
  }

  @media ${device.laptop} {
    flex-direction: row;
  }

  @media ${device.mobileL} {
    margin-top: 2rem;
    flex-direction: column;
    img {
      width: 350px;
      height: 350px;
    }
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  background: white;
  color: #313131;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;

  @media ${device.desktop} {
    flex-direction: row;
    margin-left: 10rem;
    margin-top: 0rem;
  }

  @media ${device.laptop} {
    flex-direction: row;
    margin-left: 10rem;
    margin-top: 0rem;
  }

  @media ${device.mobileL} {
    margin-left: 0rem;
    margin-top: 2rem;
    h3 {
      font-size: 1.2rem;
      line-height: 2.5rem;
    }
    li {
      font-size: 1.2rem;
      line-height: 2.5rem;
    }
  }
`;

export default Recipe;
