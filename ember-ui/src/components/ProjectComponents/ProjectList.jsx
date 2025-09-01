import { useContext, useState } from "react";
import { ProjectsContext } from "../../context/ProjectsProvider";
import ProjectTile from "./ProjectTile";
import CreateProject from "./CreateProject";
import FilterProjects from "./FilterProjects";

const ProjectList = () => {

    const { projects } = useContext(ProjectsContext);
    const [searchText, setSearchText] = useState("");
    const [selectedFilter, setSelectedFilter] = useState('');
    const [sortOrder, setSortOrder] = useState("asc"); // or 'desc'

    const collectSearchText = (event) => {
        const enteredText = event.currentTarget.value;
        setSearchText(enteredText);
    }

    const filteredProjects = projects
        .filter((p) =>
            searchText
                ? p.name.toLowerCase().includes(searchText.toLowerCase())
                : true
        )
        .filter((p) => {
            return selectedFilter
                ? p[selectedFilter] === true
                : true;
        })
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

    const projectList = filteredProjects.map((project) => {
        return <ProjectTile project={project} key={project.id} />
    });

    return (
        !projects ?
            <p>Loading Projects...</p> :
            
            <>
                <div className="projects-controls">
                    <input
                        type="text"
                        name=""
                        id=""
                        className="
                            projects-search
                            font-size-1-15r
                        "
                        value={searchText}
                        onChange={collectSearchText}
                        placeholder="Search Project Here"
                    />
                    <FilterProjects
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                    <CreateProject />
                </div>
                <div className="projectList">
                    {projectList}
                </div>
            </>
    )

}

export default ProjectList;