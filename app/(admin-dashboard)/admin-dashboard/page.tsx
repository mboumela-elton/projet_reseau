"use client";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "../../../public/data/adminrecentlisting";
import HeadlessList from "@/components/ListBox";

import dynamic from "next/dynamic";

import CounterElement from "@/components/CounterElement";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getAdminData1,
  getAdminData2,
  getAdminData3,
  getAdminData4,
  getAdminJournal,
} from "../../../api/apiRoutes";

const Page = () => {
  /*******************************************************************************/
  // fontion pour afficher le 1er cadrant des statistiques
  /***************************************************************************** */
  const [data1, setData1] = useState();
  const [data11, setData11] = useState();

  const fetchData1 = () => {
    axios
      .get(getAdminData1)
      .then((res) => {
        setData11(res.data);
        setData1(res.data[0]);
      })
      .catch((error) => {
        console.error("error fetch data 1 : " + error);
      });
  };

  useEffect(() => {
    fetchData1();
  }, []);

  const [selectedOption, setSelectedOption] = useState("1");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Effectuer d'autres actions en fonction de l'option sélectionnée
    switch (event.target.value) {
      case "1":
        // Charger les données des 7 derniers mois
        fetchDataForLastYear();
        break;
      case "2":
        fetchDataForLastMonth();
        break;
      case "3":
        // Charger les données des 7 derniers jours
        fetchDataForLastWeek();
        break;
      case "4":
        // Charger les données des 7 dernières heures
        fetchDataForLastDay();
        break;
      default:
        break;
    }
  };

  const fetchDataForLastYear = () => {
    setData1(data11[0]);
  };

  const fetchDataForLastMonth = () => {
    setData1(data11[1]);
  };

  const fetchDataForLastWeek = () => {
    setData1(data11[2]);
  };

  const fetchDataForLastDay = () => {
    setData1(data11[3]);
  };

  /*******************************************************************************/
  // fontion pour afficher le 2e cadrant des statistiques
  /***************************************************************************** */
  const [data2, setData2] = useState();

  const fetchData2 = () => {
    axios
      .get(getAdminData2)
      .then((res) => {
        setData2(res.data);
      })
      .catch((error) => {
        console.error("error fetch data 2 : " + error);
      });
  };

  useEffect(() => {
    fetchData2();
  }, []);

  /*******************************************************************************/
  // fontion pour afficher le 3e cadrant des statistiques
  /***************************************************************************** */
  const [data3, setData3] = useState();

  const fetchData3 = () => {
    axios
      .get(getAdminData3)
      .then((res) => {
        setData3(res.data);
      })
      .catch((error) => {
        console.error("error fetch data 3 : " + error);
      });
  };
  useEffect(() => {
    fetchData3();
  }, []);

  /*******************************************************************************/
  // fontion pour afficher le 4e cadrant des statistiques
  /***************************************************************************** */
  const [data4, setData4] = useState();

  const fetchData4 = () => {
    axios
      .get(getAdminData4)
      .then((res) => {
        setData4(res.data);
      })
      .catch((error) => {
        console.error("error fetch data 4 : " + error);
      });
  };

  useEffect(() => {
    fetchData4();
  }, []);

  /**************************************************************************************/
  // fonctions liés au tableau
  /**************************************************************************************/
  interface Listing {
    id: number;
    name: string;
    location: string;
    agent: string;
    date: string;
    status: string;
    review: string;
  }

  let [sortList, setSortList] = useState<Listing[]>([]);
  let [sortList2, setSortList2] = useState<Listing[]>([]);

  const fetchDataJournal = () => {
    axios
      .get(getAdminJournal)
      .then((res) => {
        setSortList(res.data);
        setSortList2(res.data);
      })
      .catch((error) => {
        console.error("error fetch data Journal : " + error);
      });
  };

  const [ans, setAns] = useState(true);

  useEffect(() => {
    fetchDataJournal();
  }, []);

  const sortByDate = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const sortByName = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortByLocation = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => a.location.localeCompare(b.location));
  };

  const sortByAgent = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => a.agent.localeCompare(b.agent));
  };

  const sortByStatus = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => a.status.localeCompare(b.status));
  };

  const sortByReview = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => parseFloat(a.review) - parseFloat(b.review));
  };

  const handleClickDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByDate(sortList2));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickName = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByName(sortList2));
    setTimeout(() => {
      setAns(true);
    }, 200);
  };

  const handleClickLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByLocation(sortList2));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickAgent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByAgent(sortList2));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByStatus(sortList2));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickReview = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByReview(sortList2));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Dashboard Adiministrator</h2>
      </div>

      <section className="grid z-[1] grid-cols-12 gap-4 lg:gap-6 px-3 lg:px-6 bg-[var(--bg-2)] relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[100px] after:top-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        {/* 1er cadrant de stats */}
        {data1 && (
          <div className="col-span-12 xxl:col-span-6">
            <div className=" rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
              <h3 className="h3 mb-4 lg:mb-6">
                Nombre et Gain des Voyages par Date
              </h3>
              <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
                <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
                  <h3 className="h3"></h3>
                  <div className="flex items-center flex-wrap gap-3">
                    <span>Sélectionner la date:</span>
                    <div className="p-3 border rounded-full ml-2">
                      <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="focus:outline-none"
                      >
                        <option value="1">Last Year</option>
                        <option value="2">Last Month</option>
                        <option value="3">Last Week</option>
                        <option value="4">Last Day</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                  <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2] items-center">
                    <i className="las self-center la-chart-area rounded-full bg-[var(--secondary-500)] text-white text-3xl p-4"></i>
                    <div>
                      <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                        $
                        <CounterElement end={data1.revenu} />k
                      </h2>
                      <p>Revenu</p>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED] items-center">
                    <i className="las self-center la-chart-bar rounded-full bg-[#9c742B] text-white text-3xl p-4"></i>
                    <div>
                      <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                        <CounterElement end={data1.nbrVoyage} decimals={0} />
                      </h2>
                      <p>nombre de voyages</p>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
                    <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
                    <div>
                      <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                        <CounterElement
                          end={data1.vehiculeTypeNbr}
                          decimals={0}
                        />
                      </h2>
                      <p>Type de véhicule</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2e cadrant de stats */}
        {data2 && (
          <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
            <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
              <h3 className="h3">Nombre d Utilsateurs Par Profil</h3>
              <div className="grid grid-cols-12 gap-4 lg:gap-6 px-4 lg:px-6 pt-4 lg:pt-6">
                <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-4 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
                  <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-primary border-[14px]">
                    <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                      <CounterElement end={data2.passager} decimals={0} />k
                    </h2>
                  </div>
                  <span className="text-2xl font-semibold mt-4">passager</span>
                  <span className="text-sm"></span>
                </div>
                <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-4 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
                  <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[#37D279] border-[14px]">
                    <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                      <CounterElement end={data2.conducteur} decimals={0} />k
                    </h2>
                  </div>
                  <span className="text-2xl font-semibold mt-4">
                    Conducteur
                  </span>
                  <span className="text-sm"></span>
                </div>
                <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-4 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
                  <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[var(--tertiary)] border-[14px]">
                    <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                      <CounterElement end={data2.proprietaire} />k
                    </h2>
                  </div>
                  <span className="text-2xl font-semibold mt-4">
                    Propriétaire
                  </span>
                  <span className="text-sm"></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3e cadrant de stats */}
      {data3 && (
        <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 m-5 md:p-6 lg:p-8 bg-white border">
          <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
            <h3 className="h3">Taux de conversion des Utilisateurs</h3>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED] items-center">
              <i className="las self-center la-chart-bar rounded-full bg-[#9c742B] text-white text-3xl p-4"></i>
              <div>
                <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                  <CounterElement end={data3.visiteur} decimals={0} />
                </h2>

                <p>Visiteurs</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
              <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
              <div>
                <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                  <CounterElement end={data3.utilisateur} decimals={0} />
                </h2>

                <p>Liste de visiteurs inscrits</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2e cadrant de stats */}
      {data4 && (
        <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 m-5 md:p-6 lg:p-8 bg-white border">
          <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
            <h3 className="h3">Taux de satisfaction des utilisateurs</h3>
          </div>
          <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
            <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
            <div>
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={data4.tauxSatisfaction} />
              </h2>

              <p>Appréciation des clients</p>
            </div>
          </div>
        </div>
      )}

      {/* cadrant du tableau*/}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 mt-4 lg:mt-6">
        <div className="p-3 sm:p-4 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white">
          <div className="flex flex-wrap gap-2 justify-between mb-7">
            <h3 className="h3">Récents voyages</h3>
            <Link
              href="/"
              className="text-primary font-semibold flex items-center gap-2"
            >
              tout visiter <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2 xl:px-4">
                    Itinéraire
                    <button onClick={handleClickName}>
                      <BarsArrowDownIcon className="ml-2 mr-2 w-7 h-5" />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Lieu départ
                    <button onClick={handleClickLocation}>
                      <BarsArrowDownIcon className="ml-2 mr-2 w-7 h-5" />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Conducteurs
                    <button onClick={handleClickAgent}>
                      <BarsArrowDownIcon className="ml-2 mr-2 w-7 h-5" />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Date
                    <button onClick={handleClickDate}>
                      <BarsArrowDownIcon className="ml-2 mr-2 w-7 h-5" />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Status
                    <button onClick={handleClickStatus}>
                      <BarsArrowDownIcon className="ml-2 mr-2 w-7 h-5" />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Avis
                    <button onClick={handleClickReview}>
                      <BarsArrowDownIcon className="ml-2 mr-2 w-7 h-5" />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {ans &&
                  sortList.map(
                    ({ id, agent, date, location, name, review, status }) => (
                      <tr
                        key={id}
                        className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300"
                      >
                        <td className="py-3 lg:py-4 px-2 xl:px-4">{name}</td>
                        <td className="py-3 lg:py-4 px-2 text-primary">
                          {location}
                        </td>
                        <td className="py-3 lg:py-4 px-2">{agent}</td>
                        <td className="py-3 lg:py-4 px-2">
                          <button onClick={() => handleClickDate}>
                            {date}
                          </button>
                        </td>

                        <td className={`py-3 lg:py-4 px-2`}>
                          <div className={`w-32`}>
                            <HeadlessList initialValue={status} />
                          </div>
                        </td>
                        <td className="py-3 lg:py-4 px-2">
                          <span className="flex gap-1 items-center">
                            <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                            {review}
                          </span>
                        </td>
                        <td className="py-3 lg:py-4 px-2">
                          <button className="text-primary px-2">
                            <PencilSquareIcon className="w-5 h-5" />
                          </button>
                          <button className="text-yellow-500 px-2">
                            <ShieldExclamationIcon className="w-5 h-5" />
                          </button>
                          <button className="text-red-500 px-2">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
