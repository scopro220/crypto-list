import Image from "next/image";
import Layout from "../components/Layout";

export default function HomePage({ coins }) {
  return (
    <Layout>
      <div className="my-9 text-center text-6xl">TOP 20 CRYPTO LIST</div>
      <div className="flex flex-col gap-4 m-auto max-w-5xl mb-6">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="flex justify-start items-center text-center py-1"
          >
            <div className="flex gap-2 w-48">
              <Image src={coin.image} alt={coin.name} height={20} width={20} />
              <p>{coin.name}</p>
            </div>
            <div className="w-12">{coin.symbol.toUpperCase()}</div>
            <div className="w-52">
              ${" "}
              {coin.current_price >= 1
                ? coin.current_price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : coin.current_price.toFixed(5)}
            </div>
            <div className="w-52">{coin.total_volume.toLocaleString()}</div>
            <div
              className={`w-40 ${
                coin.price_change_percentage_24h < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="w-52">
              Mkt Cap: $ {coin.market_cap.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
  const coins = await res.json();

  return {
    props: { coins },
  };
}
