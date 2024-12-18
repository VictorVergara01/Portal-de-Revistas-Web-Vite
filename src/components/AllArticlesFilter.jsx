import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SearchComponent from "./SearchComponent";
import InstitutionFilterComponent from "./InstitutionsFilterComponent";
import { FiFilter } from "react-icons/fi";
import "./styles/AllArticlesFilter.css";

function AllArticlesFilter({
  onSearch,
  onApplyInstitutionFilter,
  institutions,
  selectedInstitutions,
}) {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className="all-articles-filter-container">
      <Button
        variant="primary"
        className="toggle-filters-button sticky-button"
        onClick={toggleFilters}
      >
        <FiFilter className="filter-icon" />
      </Button>
      {filtersVisible && (
        <div className="all-articles-filter">
          <SearchComponent onSearch={onSearch} />
          <InstitutionFilterComponent
            institutions={institutions}
            selectedInstitutions={selectedInstitutions}
            onApplyInstitutionFilter={onApplyInstitutionFilter}
          />
        </div>
      )}
    </div>
  );
}

export default AllArticlesFilter;
