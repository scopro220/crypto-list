import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function CoinPage({ currentCoin }) {
  return (
    <Layout>
      <div className="flex justify-center items-center mt-32 flex-col text-4xl">
        <Link href="/">
          <a className="mb-4">&lt; Go Back</a>
        </Link>
        <div className="rounded p-5 bg-gray-600 flex flex-col gap-y-5 items-center">
          <div className="text-center text-4xl">
            {currentCoin[0].symbol.toUpperCase()}
          </div>
          <Image
            src={currentCoin[0].image}
            alt={currentCoin[0].name}
            height={200}
            width={200}
          />
          <div className="text-center text-3xl">{currentCoin[0].name}</div>
          <div className="text-center text-3xl">
            ${" "}
            {currentCoin[0].current_price >= 1
              ? currentCoin[0].current_price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : currentCoin[0].current_price.toFixed(5)}
          </div>
          <div className="text-center text-3xl">
            Vol: {currentCoin[0].total_volume.toLocaleString()}
          </div>
          <div
            className={`text-center text-3xl w-40 ${
              currentCoin[0].price_change_percentage_24h < 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {currentCoin[0].price_change_percentage_24h}%
          </div>
          <div className="text-center text-3xl">
            Mkt Cap: $ {currentCoin[0].market_cap.toLocaleString()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
  const coins = await res.json();

  const coinPaths = coins.map((coin) => ({
    params: { id: coin.id },
  }));

  return {
    paths: coinPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
  const coins = await res.json();

  const currentCoin = coins.filter((coin) => coin.id === params.id);

  return {
    props: { currentCoin },
  };
}
