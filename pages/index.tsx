import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
// import ReactJson from "react-json-view";
import SearchRet from "../modes/searchRet";

const ReactJson = dynamic(import("react-json-view"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [searchVal, setSearchVal] = useState("");
  const [searctRet, setSearctRet] = useState<SearchRet[]>();
  const [channelRet, setChannelRet] = useState<any>();
  const [viewJson, setViewJson] = useState<SearchRet>();

  const searchHandle = useCallback(() => {
    fetch(`${window.location.origin}/api/search?query=${searchVal}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data?.length) return alert("Could not fetch videos");
        setSearctRet(data.data);
      })
      .catch((e) => {
        console.log(e);
        alert("Could not fetch videos");
      });
  }, [searchVal]);

  const searchChannelHandle = useCallback((name: string) => {
    fetch(`${window.location.origin}/api/channel?query=${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data?.length) return alert("Could not fetch videos");
        setChannelRet(data.data);
      })
      .catch((e) => {
        console.log(e);
        alert("Could not fetch videos");
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>YouTube Next Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center relative">
        {!!viewJson && (
          <div className="absolute left-0 top-0 w-full h-full bg-white text-left">
            <div className="text-right pr-[10px] text-lg font-bold">
              <button
                onClick={() => {
                  setViewJson(undefined);
                }}
              >
                关闭
              </button>
            </div>
            <ReactJson src={viewJson} />
            <ReactJson src={channelRet} />
          </div>
        )}
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
        {searctRet && (
          <div className="grid grid-cols-4 gap-4 mt-6">
            {searctRet.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setViewJson(item);
                  searchChannelHandle(item.channel.name);
                }}
                className="rounded border shadow flex flex-col items-center cursor-pointer hover:shadow-lg"
              >
                <img height={230} src={item.thumbnail.url} alt="" />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
