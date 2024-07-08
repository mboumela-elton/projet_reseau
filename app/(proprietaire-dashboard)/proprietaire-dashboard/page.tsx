"use client";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "../../../components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "../../../public/data/adminrecentlisting";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import HeadlessList from "../../../components/ListBox";
import CounterElement from "../../../components/CounterElement";
import axios from "axios";
import {
  getConducteurData1,
  getConducteurData2,
  getConducteurData3,
  getConducteurJournal,
} from "../../../api/apiRoutes";
import { data } from "autoprefixer";

const Page = () => {
  // stats 1
  const [data1, setData1] = useState();
  const [data11, setData11] = useState();

  const fetchData1 = () => {
    axios
      .get(getConducteurData1)
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

  // stats 2
  const [data2, setData2] = useState();
  const [data22, setData22] = useState();

  const fetchData2 = () => {
    axios
      .get(getConducteurData2)
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

  const [selectedOption2, setSelectedOption2] = useState("1");
  const handleOptionChange2 = (event) => {
    setSelectedOption(event.target.value);
    // Effectuer d'autres actions en fonction de l'option sélectionnée
    switch (event.target.value) {
      case "1":
        // Charger les données des 7 derniers mois
        fetchDataForLastYear2();
        break;
      case "2":
        fetchDataForLastMonth2();
        break;
      case "3":
        // Charger les données des 7 derniers jours
        fetchDataForLastWeek2();
        break;
      case "4":
        // Charger les données des 7 dernières heures
        fetchDataForLastDay2();
        break;
      default:
        break;
    }
  };

  const fetchDataForLastYear2 = () => {
    setData2(data22[0]);
  };

  const fetchDataForLastMonth2 = () => {
    setData2(data22[1]);
  };

  const fetchDataForLastWeek2 = () => {
    setData2(data22[2]);
  };

  const fetchDataForLastDay2 = () => {
    setData2(data22[3]);
  };

  // stats 3
  const [data3, setData3] = useState();
  const [data33, setData33] = useState();

  const fetchData3 = () => {
    axios
      .get(getConducteurData3)
      .then((res) => {
        setData33(res.data);
        setData3(res.data[0]);
      })
      .catch((error) => {
        console.error("error fetch data 3 : " + error);
      });
  };

  useEffect(() => {
    fetchData3();
  }, []);

  const [selectedOption3, setSelectedOption3] = useState("1");
  const handleOptionChange3 = (event) => {
    setSelectedOption(event.target.value);
    // Effectuer d'autres actions en fonction de l'option sélectionnée
    switch (event.target.value) {
      case "1":
        // Charger les données des 7 derniers mois
        fetchDataForLastYear3();
        break;
      case "2":
        fetchDataForLastMonth3();
        break;
      case "3":
        // Charger les données des 7 derniers jours
        fetchDataForLastWeek3();
        break;
      case "4":
        // Charger les données des 7 dernières heures
        fetchDataForLastDay3();
        break;
      default:
        break;
    }
  };

  const fetchDataForLastYear3 = () => {
    setData3(data33[0]);
  };

  const fetchDataForLastMonth3 = () => {
    setData3(data33[1]);
  };

  const fetchDataForLastWeek3 = () => {
    setData3(data33[2]);
  };

  const fetchDataForLastDay3 = () => {
    setData3(data33[3]);
  };

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
      .get(getConducteurJournal)
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
        <h2 className="h2 text-white">Dashboard conducteur sans véhicule</h2>
      </div>
      <section className="grid z-[1] grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 px-6 bg-[var(--dark)] relative after:absolute xxl:after:bg-white after:w-full after:h-[50%] after:bottom-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        {data1 && (
          <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2]">
            <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>{" "}
            <div>
              <h2 className="h2">
                $ <CounterElement end={data1.nbrVoyage} />k
              </h2>
              <p>Nombre de voyages éffectués</p>
              <div className="flex items-center gap-3">
                <span>Trier par:</span>
                <div className="flex items-center p-2 border rounded-full ml-2">
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
          </div>
        )}

        {data2 && (
          <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#85f7ae]">
            <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
            <div>
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={data2.avis} decimals={1} />
              </h2>
              <p>Avis du client</p>
              <div className="flex items-center gap-3">
                <span>Trier par:</span>
                <div className="flex items-center p-2 border rounded-full ml-2">
                  <select
                    value={selectedOption2}
                    onChange={handleOptionChange2}
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
          </div>
        )}

        {data3 && (
          <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#b0b5f7]">
            <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
            <div>
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={data3.nbrKm} decimals={1} />
                km
              </h2>
              <p>Nombre de kilomètres parcourus</p>
              <div className="flex items-center gap-3">
                <span>Trier par:</span>
                <div className="flex items-center p-2 border rounded-full ml-2">
                  <select
                    value={selectedOption3}
                    onChange={handleOptionChange3}
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
          </div>
        )}
      </section>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 mt-4 lg:mt-6">
        <div className="p-3 sm:p-4 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white">
          <div className="flex flex-wrap gap-2 justify-between mb-7">
            <h3 className="h3">Historique des Voyages</h3>
            <Link
              href="/"
              className="text-primary font-semibold flex items-center gap-2"
            >
              Tout afficher <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2 xl:px-4">Nom du voyage</th>
                  <th className="py-3 lg:py-4 px-2">Itinéraire</th>
                  <th className="py-3 lg:py-4 px-2">Heure de départ</th>
                  <th className="py-3 lg:py-4 px-2">Date</th>
                  <th className="py-3 lg:py-4 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Review</th>
                </tr>
              </thead>
              <tbody>
                {ans &&
                  sortList.map(
                    ({
                      id,
                      item,
                      date,
                      time,
                      // itineraire,
                      name,
                      review,
                      status,
                    }) => (
                      <tr
                        key={id}
                        className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300"
                      >
                        <td className="py-3 lg:py-4 px-2 xl:px-4">{item}</td>
                        <td className="py-3 lg:py-4 px-2 text-primary">
                        {item}
                        </td>
                        <td className="py-3 lg:py-4 px-2">{time}</td>
                        <td className="py-3 lg:py-4 px-2">{date}</td>

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
    </div>
  );
};

export default Page;
