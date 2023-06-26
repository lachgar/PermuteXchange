import { Chart } from "primereact/chart";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import ProfesseursContext from './ProfesseursContext';
import ProgressBarWithLabel from "./ProgressBar";

const Dashboard = () => {
  const [specialityTableData, setSpecialityTableData] = useState([]);
  const [cityTableData, setCityTableData] = useState([]);
  const [gradeTableData, setGradeTableData] = useState([]);
  const dataP = useContext(ProfesseursContext);


  useEffect(() => {
    const countBySpeciality = () => {
      const counts = {};
      dataP.forEach((prof) => {
        counts[prof["specialite"]] = counts[prof["specialite"]] || 0;
        counts[prof["specialite"]]++;
      });
      console.log(counts)
      return counts;
    };

    const countByCity = () => {
      const counts = {};
      dataP.forEach((prof) => {
        const cities = prof["villeDesiree"].split(";");
        cities.forEach((city) => {
          counts[city] = counts[city] || 0;
          counts[city]++;
        });
      });
      return counts;
    };

    const countByGrade = () => {
      const counts = {};
      dataP.forEach((prof) => {
        counts[prof["grade"]] = counts[prof["grade"]] || 0;
        counts[prof["grade"]]++;
      });
      return counts;
    };

    setSpecialityTableData(
      Object.entries(countBySpeciality()).map(([specialite, count]) => ({
        specialite,
        count,
      })).sort((a, b) => b.count - a.count).slice(0, 15)
    );
    setCityTableData(
      Object.entries(countByCity()).map(([city, count]) => ({
        city,
        count,
      })).sort((a, b) => b.count - a.count).slice(0, 15)
    );
    setGradeTableData(
      Object.entries(countByGrade()).map(([grade, count]) => ({
        grade,
        count,
      })).sort((a, b) => b.count - a.count).slice(0, 15)
    );

  }, [dataP]);

  const specialityChartData = {
    labels: specialityTableData.map((data) => data.specialite),
    datasets: [
      {
        data: specialityTableData.map((data) => data.count),
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#FFEB3B",
          "#EF5350",
          "#AB47BC",
          "#FF7043",
          "#8D6E63",
          "#EC407A",
          "#78909C",
          "#26C6DA",
          "#FFCA28",
          "#FF5722",
          "#7E57C2",
          "#00ACC1",
        ],
      },
    ],
  };


  const cityChartData = {
    labels: cityTableData.map((data) => data.city),
    datasets: [
      {
        data: cityTableData.map((data) => data.count),
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#FFEB3B",
          "#EF5350",
          "#AB47BC",
          "#FF7043",
          "#8D6E63",
          "#EC407A",
          "#78909C",
          "#26C6DA",
          "#FFCA28",
          "#FF5722",
          "#7E57C2",
          "#00ACC1",
        ],
      },
    ],
  };

  const gradeChartData = {
    labels: gradeTableData.map((data) => data.grade),
    datasets: [
      {
        data: gradeTableData.map((data) => data.count),
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#FFEB3B",
          "#EF5350",
          "#AB47BC",
          "#FF7043",
          "#8D6E63",
          "#EC407A",
          "#78909C",
          "#26C6DA",
          "#FFCA28",
          "#FF5722",
          "#7E57C2",
          "#00ACC1",
        ],
      },
    ],
  };

  return Object.keys(dataP).length > 0 ? (
    <Container>
      <h1>Statistiques</h1>
      <div className="p-grid p-justify-center p-fluid dashboard">
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Nombre de profs inscrits : {dataP.length} </span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="row p-grid p-fluid dashboard" style={{ alignItems: 'center' }}>
          <div className="p-col-12 p-lg-4 p-col-align-center">
            <div className="card summary">
              <span className="title">Nombre de profs par spécialité</span>
              <Chart type="pie" data={specialityChartData} style={{}} />
            </div>
          </div>
          <div className="p-col-12 p-lg-4 p-col-align-center">
            <div className="card summary">
              <span className="title">Villes les plus demandées</span>
              <Chart type="pie" data={cityChartData} style={{}} />
            </div>
          </div>
          <div className="p-col-12 p-lg-4 p-col-align-center">
            <div className="card summary">
              <span className="title">Nombre de profs par grade</span>
              <Chart type="pie" data={gradeChartData} style={{}} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-grid p-justify-center p-fluid dashboard">
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Nombre de profs par spécialité (Top 15)</span>
            <DataTable value={specialityTableData} className="custom-datatable">
              <Column field="specialite" header="Spécialité"></Column>
              <Column field="count" header="Nombre"></Column>
            </DataTable>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Villes les plus demandées (Top 15)</span>
            <DataTable value={cityTableData} className="custom-datatable">
              <Column field="city" header="Ville"></Column>
              <Column field="count" header="Nombre"></Column>
            </DataTable>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Nombre de profs par grade </span>
            <DataTable value={gradeTableData} className="custom-datatable">
              <Column field="grade" header="Grade"></Column>
              <Column field="count" header="Nombre"></Column>
            </DataTable>
          </div>
        </div>
      </div>

    </Container>

  ) : (<ProgressBarWithLabel />);
};

export default Dashboard;
