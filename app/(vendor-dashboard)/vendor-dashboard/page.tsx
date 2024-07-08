"use client";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { recentBookings } from "@/public/data/recentbookings";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import CounterElement from "@/components/CounterElement";
import axios from "axios";
import {
  getConducteurVehiculeData1,
  getConducteurVehiculeData2,
  getConducteurVehiculeData3,
  getConducteurVehiculeJournal,
} from "../../../api/apiRoutes";

const Page = () => {
  // stats 1
  const [data1, setData1] = useState();
  const [data11, setData11] = useState();

  const fetchData1 = () => {
    axios
      .get(getConducteurVehiculeData1)
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
      .get(getConducteurVehiculeData2)
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

  const fetchData3 = () => {
    axios
      .get(getConducteurVehiculeData3)
      .then((res) => {
        setData3(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("error fetch data 3 : " + error);
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
  let [sortList2, setSortList2] = useState<Listing[]>([]);

  const fetchDataJournal = () => {
    axios
      .get(getConducteurVehiculeJournal)
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
        <h2 className="h2 text-white">Dashboard Conducteur avec véhicule</h2>
      </div>
      {/* statisticts */}
      <div className="grid z-[1] grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 px-6 bg-[var(--dark)] relative after:absolute xxl:after:bg-white after:w-full after:h-[50%] after:bottom-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        {data1 && (
          <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2]">
            <i className="las self-center la-chart-area rounded-full bg-[var(--secondary-500)] text-white text-3xl p-4"></i>
            <div>
              <h2 className="h2">
                $ <CounterElement end={data1.gain} />k
              </h2>
              <p>Gain par Vehicule</p>
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
          <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED]">
            <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>
            <div>
              <h2 className="h2">
                <CounterElement end={data2.voyagePublie} decimals={0} />
              </h2>
              <p>Voyages publiés</p>
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
          <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD]">
            <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
            <div className="p-4">
              <h2 className="h2">
                {" "}
                <CounterElement end={data3.avis} decimals={0} />
              </h2>
              <p>Avis Clients</p>
            </div>
          </div>
        )}
      </div>
      {/* Recent bookings */}
      <section className="bg-white px-3 lg:px-6 mt-4 lg:mt-6 pb-5">
        <div className=" p-3 sm:p-4 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl">
          <div className="flex justify-between mb-7">
            <h3 className="h3">Historique de publications</h3>
            <Link
              href="/"
              className="text-primary font-semibold flex items-center gap-2"
            >
              Tout voir <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[#F5F5FE] border-b border-dashed">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Itinéraire</th>
                  <th className="py-3 px-2">Passagers</th>
                  <th className="py-3 px-2">Coût</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Durée</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Avis</th>
                </tr>
              </thead>
              <tbody>
                {ans &&
                  sortList.map(
                    ({
                      id,
                      amount,
                      date,
                      item,
                      nomPassager,
                      paid,
                      status,
                      time,
                      review,
                    }) => (
                      <tr key={id} className="border-b border-dashed">
                        <td className="py-3 px-2">{id}</td>
                        <td className="py-3 px-2 text-primary">{item}</td>
                        <td className="py-3 px-2">{nomPassager}</td>
                        <td className="py-3 px-2">{amount}</td>
                        <td className="py-3 px-2">{date}</td>
                        <td className="py-3 px-2">{time}</td>
                        <td className={`py-3 px-2`}>
                          <span
                            className={`py-2 px-3 rounded-xl ${
                              status == "Rejected" &&
                              "text-[var(--secondary-500)] bg-[#EBFBF2]"
                            } ${
                              status == "Successfull" &&
                              "text-primary bg-[#EBEBFD]"
                            } ${
                              status == "Pending" &&
                              "text-[#9C742B] bg-[#FFF9ED]"
                            }`}
                          >
                            {status}
                          </span>
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
