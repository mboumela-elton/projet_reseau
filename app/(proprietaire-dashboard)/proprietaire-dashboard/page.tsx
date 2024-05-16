"use client";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Pagination from "../../../components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "../../../public/data/adminrecentlisting";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import HeadlessList from "../../../components/ListBox";
import CounterElement from "../../../components/CounterElement";

const Page = () => {
  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Dashboard</h2>
      </div>

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
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {adminRecentListings.map(
                  ({
                    id,
                    heureDepart,
                    date,
                    itineraire,
                    name,
                    review,
                    status,
                  }) => (
                    <tr
                      key={id}
                      className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300"
                    >
                      <td className="py-3 lg:py-4 px-2 xl:px-4">{name}</td>
                      <td className="py-3 lg:py-4 px-2 text-primary">
                        {itineraire}
                      </td>
                      <td className="py-3 lg:py-4 px-2">{heureDepart}</td>
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
                      <td className="py-3 lg:py-4 px-2">
                        <button className="text-primary px-2">
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button className="text-[var(--secondary-500)] px-2">
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
      <div className="m-5 col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
        <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
          <h3 className="h3">Kilométrage</h3>
          <div className="flex items-center flex-wrap gap-3">
            <span>Sélectionner la date:</span>
            <div className="p-3 border rounded-full ml-2">
              <select className="focus:outline-none">
                <option value="1">Last 7 Month</option>
                <option value="2">Last 7 Week</option>
                <option value="3">Last 7 Days</option>
                <option value="3">Last 7 Hours</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
            <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
            <div>
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={66.5} decimals={1} />
                km
              </h2>
              <p>Nombre de kilomètres parcourus</p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-5 col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
        <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
          <h3 className="h3">Nombre de voyages-Avis Client</h3>
          <div className="flex items-center flex-wrap gap-3">
            <span>Sélectionner la date:</span>
            <div className="p-3 border rounded-full ml-2">
              <select className="focus:outline-none">
                <option value="1">Last 7 Month</option>
                <option value="2">Last 7 Week</option>
                <option value="3">Last 7 Days</option>
                <option value="3">Last 7 Hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
            <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>
            <div>
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={65.5} decimals={1} />
              </h2>
              <p>Nombre de Voyages effectués</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
            <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
            <div>
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={7.6} decimals={1} />k
              </h2>
              <p>Avis du client</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
