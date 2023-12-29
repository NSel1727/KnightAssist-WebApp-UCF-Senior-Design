import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHeader.js';
import '../Header.css';
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Announcements from "./Announcements";
import './Announcements.css';
import { buildPath } from '../../path';



function NewAnn() {
  var [announcements, setAnnouncements] = useState([]);
  var [searchAnnouncement, setSearchAnnouncement] = useState([]);
  var [filterTerm, setFilterTerm] = useState("");
  var [favOrgs, setFavOrgs] = useState([]);
  var [favUpdates, setFavUpdates] = useState([]);
  var [finalFavUpdates, setFinalFavUpdates] = useState([]);


  const reverseSearchResults = () => {
  setSearchAnnouncement((prevResults) => [...prevResults].reverse());
};


  var url2 = buildPath(`api/loadAllOrganizations`);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFavoritedUpdates = async () => {
    const userID = "6519e4fd7a6fa91cd257bfda"; // John Doe
    url2 = buildPath(`api/loadFavoritedOrgsEvents?userID=${userID}`);
    try {
      let response = await fetch(url2, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      let res1 = await response.json();
      var favUpdates = [];
      for(let org of res1) {
        if(org.updates.length !== 0) {
          favUpdates.push({_id: org._id, orgName: org.name, update: org.updates});
        }
      }
      setFinalFavUpdates(favUpdates);
      setFavUpdates(favUpdates);
    } catch(e) {
      console.log("failed to fetch fav updates");
    }
  };
  

  const fetchAllUpdates = async () => {
    try {
      let response = await fetch(url2, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      let res = await response.json();

      let updatesArray = [];

      for (let org of res) {
        try {
          var url3 = buildPath(
            `api/loadAllOrgAnnouncements?organizationID=${org._id}`
          );

          response = await fetch(url3, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          let orgUpdates = await response.json();

          if (
            orgUpdates.announcements &&
            Array.isArray(orgUpdates.announcements)
          ) {
            const announcementsWithOrgName = orgUpdates.announcements.map((announcement) => ({
              ...announcement,
              organizationName: org.name.trim(),
            }));

            updatesArray.push(...announcementsWithOrgName);
          } else {
            console.error("Invalid response from org updates API:", orgUpdates);
          }
        } catch (e) {
          console.error("Failed to fetch org updates:", e);
        }
      }
      updatesArray.reverse();

      setAnnouncements(updatesArray);
      setSearchAnnouncement(updatesArray);
    } catch (e) {
      console.error("API call failed:", e);
    }
  };

  const searchAnnouncements = (searchTerm) => {
    console.log(filterTerm);
  
    if (filterTerm !== "") {
      console.log("HEREE-------------------");
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
      const filteredResults = searchAnnouncement.filter((a) => {
        const title = a.title ? a.title.toLowerCase() : "";
        const organizationName = a.organizationName
          ? a.organizationName.toLowerCase()
          : "";
  
        const includesSearchTerm =
          title.includes(lowerCaseSearchTerm) ||
          organizationName.includes(lowerCaseSearchTerm);
  
        return includesSearchTerm;
      });
      setSearchAnnouncement(filteredResults);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
      const filteredResults = announcements.filter((a) => {
        const title = a.title ? a.title.toLowerCase() : "";
        const organizationName = a.organizationName
          ? a.organizationName.toLowerCase()
          : "";
  
        const includesSearchTerm =
          title.includes(lowerCaseSearchTerm) ||
          organizationName.includes(lowerCaseSearchTerm);
  
        return includesSearchTerm;
      });
  
      setSearchAnnouncement(filteredResults.reverse());
    }
  };
  
  
  
  
  
  

  const filterAnnouncements = (filterTerm) => {

    const term = filterTerm.toLowerCase();
    setFilterTerm(term);

    let filteredAnnouncements = [...announcements];

    if (term !== "") {
      if (term === "favorited") {
        console.log("favorited!!!");

        filteredAnnouncements = favUpdates.flatMap(org => (
          org.update.map(announcement => ({
            ...announcement,
            organizationName: org.orgName,
          }))
        ));
        console.log(filteredAnnouncements);
        setSearchAnnouncement(filteredAnnouncements.reverse());
      } else {
        filteredAnnouncements = filteredAnnouncements.filter((a) =>
          a.title && a.title.toLowerCase().includes(term)
        );
        setSearchAnnouncement(filteredAnnouncements);
      }
    } else {
      console.log("All!!!");
      setSearchAnnouncement(filteredAnnouncements);
    }

    
  };
  
  
  
  
  
  

  // New function to handle organization name filtering


  useEffect(() => {
    fetchAllUpdates();
    fetchFavoritedUpdates();
  }, []);

  return (
    <div id="studentAnnouncements">
      <div className="studAnnouncementsPage">
      <div class="StudentAnnouncements-title">Announcements</div>
        <div className="testing">
          <StudentHeader/>
          <div className="topSection">
            <SearchBar
              searchAnnouncements={searchAnnouncements}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              filterTerm={filterTerm}
              setFilterTerm={setFilterTerm}
              fetchAllUpdates={fetchAllUpdates}
              finalFavUpdates = {finalFavUpdates}
              setSearchAnnouncement={setSearchAnnouncement}
              initialAnnouncements={announcements}
            />
            <Filter filterAnnouncements={filterAnnouncements} />
          </div>
        </div>
        <Announcements announcements={searchAnnouncement} />
      </div>
    </div>
  );
}

export default NewAnn;
