import { useContext, useState, useEffect, useRef } from "react";
import { ProjectsContext } from "../../context/ProjectsProvider";

const FilterProjects = ({ 
    selectedFilter, 
    setSelectedFilter,
    setSortOrder,
    sortOrder
}) => {

    const [displayingDropdown, setDisplayDropdown] = useState(false);
    const { projects } = useContext(ProjectsContext);
    const ref = useRef(null);

    const appliedFilters = {
        favoritesFilter: {
            filterProp: "favorited",
            filterText: "Favorites",
            icon: "star-icon"
        },
        cloudflareFilter: {
            filterProp: "cloudflareEnabled",
            filterText: "Deployed to Cloudflare",
            icon: "cloudflare-icon"
        },
        gitHubFilter: {
            filterProp: "githubEnabled",
            filterText: "Deployed to Github",
            icon: "github-icon"
        },
        gitFilter: {
            filterProp: "gitEnabled",
            filterText: "Git Enabled",
            icon: "git-icon"
        }
    }

    const displayDropdown = () => {
        setDisplayDropdown(!displayingDropdown);
    }

    const selectFilter = (event) => {
        const filterSelected = event.target.dataset.filter;
        if (filterSelected === selectedFilter) {
            // toggle off filter
            setSelectedFilter('');
        } else {
            setSelectedFilter(filterSelected);
        }
        setDisplayDropdown(false);
    }

    const selectSort = (event) => {
        const orderSelected = event.target.dataset.order;
        setSortOrder(orderSelected)
        setDisplayDropdown(false);
    }

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setDisplayDropdown(false);
            }
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    return (
        <div className="filter-wrapper" ref={ref}>
            <button
                className="projects-filter"
                onClick={displayDropdown}
            >
                <i className="filter-icon"></i>
            </button>
            <div className={`${displayingDropdown ? 'show' : 'hide'} menu-dropdown-container`}>
                {Object.entries(appliedFilters).map(([key, filter]) => (
                    <p
                        key={filter.filterProp}
                        className={`project-filter-option ${selectedFilter === filter.filterProp ? 'selected' : ''}`}
                        data-filter={filter.filterProp}
                        onClick={selectFilter}
                    >
                        <i className={filter.icon}></i>
                        {filter.filterText}
                    </p>
                ))}

                <hr />

                <p
                    className={`project-filter-option ${sortOrder === "asc" ? "selected" : ""}`}
                    data-order="asc"
                    onClick={selectSort}
                >
                    <i className="sort-asc-icon"></i> Ascending by Created Date
                </p>
                <p
                    className={`project-filter-option ${sortOrder === "desc" ? "selected" : ""}`}
                    data-order="desc"
                    onClick={selectSort}
                >
                    <i className="sort-desc-icon"></i> Descending by Created Date
                </p>
            </div>
        </div>
    )
}


export default FilterProjects;