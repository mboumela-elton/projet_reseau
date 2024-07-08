"use client";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  BarsArrowDownIcon,
  ShieldExclamationIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "../../../public/data/adminrecentlisting";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import HeadlessList from "@/components/ListBox";
import CounterElement from "@/components/CounterElement";
import axios from "axios";
import {
  getPassagerData1,
  getPassagerData2,
  getPassagerData3,
  getPassagerJournal,
} from "../../../api/apiRoutes";

const Page = () => {
  /**************************************************************************************/
  // fonctions liés au 1er cadrant
  /**************************************************************************************/
  const [data11, setData11] = useState<string[]>([]);
  const [data12, setData12] = useState<number[]>([]);
  const [data13, setData13] = useState<string[]>([]);
  const [data14, setData14] = useState<number[]>([]);

  const fetchData1 = () => {
    axios
      .get(getPassagerData1)
      .then((res) => {
        setData11(res.data.villes);
        setData12(res.data.villeNbr);
        setData13(res.data.vehicules);
        setData14(res.data.vehiculeNbr);
      })
      .catch((error) => {
        console.error("error fetch data 1 : " + error);
      });
  };

  useEffect(() => {
    fetchData1();
  }, []);

  const firstDonutData = {
    options: {
      labels: data11,
    },
    series: data12, // Exemple de données de fréquentation
  };

  // Données pour le deuxième diagramme circulaire
  const secondDonutData = {
    options: {
      labels: data13,
    },
    series: data14, // Exemple de données sur le type de véhicule
  };

  /**************************************************************************************/
  // fonctions liés au 2e cadrant
  /**************************************************************************************/
  const [data2, setData2] = useState();
  const [data22, setData22] = useState();

  const fetchData2 = () => {
    axios
      .get(getPassagerData2)
      .then((res) => {
        setData22(res.data);
        setData2(res.data[0]);
      })
      .catch((error) => {
        console.error("error fetch data 2 : " + error);
      });
  };

  useEffect(() => {
    fetchData2();
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
    setData2(data22[0]);
  };

  const fetchDataForLastMonth = () => {
    setData2(data22[1]);
  };

  const fetchDataForLastWeek = () => {
    setData2(data22[2]);
  };

  const fetchDataForLastDay = () => {
    setData2(data22[3]);
  };
  /**************************************************************************************/
  // fonctions liés au 3e cadrant
  /**************************************************************************************/

  const [data3, setData3] = useState();

  const fetchData3 = () => {
    axios
      .get(getPassagerData3)
      .then((res) => {
        setData3(res.data);
      })
      .catch((error) => {
        console.error("error fetch data 2 : " + error);
      });
  };

  useEffect(() => {
    fetchData3();
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

  const fetchDataJournal = () => {
    axios
      .get(getPassagerJournal)
      .then((res) => {
        setSortList(res.data);
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
    setSortList(sortByDate(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickName = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByName(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 200);
  };

  const handleClickLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByLocation(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickAgent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByAgent(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByStatus(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickReview = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByReview(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Dashboard Passager</h2>
      </div>

      {/* statisticts */}
      <section className="grid z-[1] grid-cols-12 gap-4 lg:gap-6 px-3 lg:px-6 bg-[var(--bg-2)] relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[100px] after:top-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        {/* 1er cadrant */}
        {data11 && (
          <div className="col-span-12 xxl:col-span-6">
            <div className=" rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
              <h3 className="h3 mb-4 lg:mb-6">Les plus visités</h3>

              <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4  items-center justify-space-around">
                <Chart
                  options={{
                    chart: {
                      type: "donut",
                      toolbar: {
                        show: false,
                      },
                    },
                    colors: [
                      "#2D3A96",
                      "#3B22A2",
                      "#E0D9FD",
                      "#FE9261",
                      "#12ECFA",
                    ],
                    dataLabels: {
                      enabled: false,
                    },
                    stroke: {
                      curve: "smooth",
                    },
                    labels: firstDonutData.options.labels,
                  }}
                  series={firstDonutData.series}
                  type="donut"
                />
                <Chart
                  options={{
                    chart: {
                      type: "donut",
                      toolbar: {
                        show: false,
                      },
                    },
                    colors: ["#2D3A97", "#3B22A6", "#E0D9FD", "#FE9460"],
                    dataLabels: {
                      enabled: false,
                    },
                    stroke: {
                      curve: "smooth",
                    },
                    labels: secondDonutData.options.labels,
                  }}
                  series={secondDonutData.series}
                  type="donut"
                />
              </div>
            </div>
          </div>
        )}{" "}
        {/* 2e cadrant */}
        {data2 && (
          <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
            <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
              <h3 className="h3">Statistiques</h3>
              <div className="flex items-center flex-wrap gap-3">
                <span>Triez par:</span>
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
                    <CounterElement end={data2.nbrKm} />
                    Km
                  </h2>
                  <p>Kilomètres parcourus</p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED] items-center">
                <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>
                <div>
                  <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                    <CounterElement end={data2.nbrVoyage} decimals={0} />
                  </h2>
                  <p>Nombres de voyages</p>
                </div>
              </div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        )}
      </section>

      {/* Stats */}
      {data3 && (
        <div className="grid grid-cols-12 gap-4 lg:gap-6 px-4 lg:px-6 pt-4 lg:pt-6">
          <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-3 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
            <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-primary border-[14px]">
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={data3.pointFidelite} decimals={0} />
                pf
              </h2>
            </div>
            <span className="text-2xl font-semibold mt-4">
              Points de fidélité
            </span>
            <span className="text-sm"></span>
          </div>
          <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-3 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
            <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[#37D279] border-[14px]">
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={data3.vehiculeEmprunte} decimals={0} />
              </h2>
            </div>
            <span className="text-2xl font-semibold mt-4">
              Véhicules empruntés
            </span>
            <span className="text-sm">Depuis le début</span>
          </div>
          <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-3 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
            <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[var(--tertiary)] border-[14px]">
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={data3.destinationVisitee} />
              </h2>
            </div>
            <span className="text-2xl font-semibold mt-4">
              Destinations visitées
            </span>
            <span className="text-sm">Depuis le début</span>
          </div>
          <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-3 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
            <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[#8A8DF5] border-[14px]">
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={data3.depense} />k
              </h2>
            </div>
            <span className="text-2xl font-semibold mt-4">Dépensés</span>
            <span className="text-sm">Depuis le début</span>
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
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
