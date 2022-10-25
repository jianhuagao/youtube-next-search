import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

const Home: NextPage = () => {
  const [searchVal, setSearchVal] = useState("");

  const searchHandle = useCallback(() => {
    fetch(`${window.location.origin}/api/search?query=${searchVal}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data?.length) return alert("Could not fetch videos");
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
        alert("Could not fetch videos");
      });
  }, [searchVal]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>YouTube Next Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="ring-1 rounded-md h-8 px-2 shadow-sm"
            value={searchVal}
            onChange={(v) => {
              setSearchVal(v.target.value);
            }}
          />
          <button
            onClick={searchHandle}
            className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm ml-2"
          >
            搜索
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
