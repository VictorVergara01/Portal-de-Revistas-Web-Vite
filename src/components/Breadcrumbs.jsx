import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { FaHome } from "react-icons/fa";

const Breadcrumbs = () => {
  const location = useLocation();

  // Divide la ruta en segmentos
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="mt-3">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        <FaHome className="me-1" />
        Inicio
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Breadcrumb.Item active key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ")}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ")}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
