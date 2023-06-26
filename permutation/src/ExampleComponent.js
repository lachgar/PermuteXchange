import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import jsonData from "./file1.json";

const ExampleComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setData(jsonData);
    setFilteredData(jsonData);
  }, []);

  const onFilter = (event) => {
    setFilteredData(
      data.filter((item) =>
        item[event.field]
          .toString()
          .toLowerCase()
          .includes(event.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <DataTable value={filteredData}>
        <Column field="Nom" header="Nom" filter filterMatchMode="contains" onFilter={onFilter} />
        <Column field="Prénom" header="Prénom" filter filterMatchMode="contains" onFilter={onFilter} />
        <Column field="Email" header="Email" filter filterMatchMode="contains" onFilter={onFilter} />
        <Column field="Grade" header="Grade" filter filterMatchMode="contains" onFilter={onFilter} />
        <Column field="Spécialité" header="Spécialité" filter filterMatchMode="contains" onFilter={onFilter} />
        <Column field="Faculté Actuelle" header="Faculté Actuelle" filter filterMatchMode="contains" onFilter={onFilter} />
        <Column field="Ville de la Faculté Actuelle" header="Ville de la Faculté Actuelle" filter filterMatchMode="contains" onFilter={onFilter} />
        <Column field="Ville Désirée" header="Ville Désirée" filter filterMatchMode="contains" onFilter={onFilter} />
      </DataTable>
    </div>
  );
};

export default ExampleComponent;
