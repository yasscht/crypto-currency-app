import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Row, Col, Card, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    const filterData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setCryptos(filterData);
  }, [cryptosList, searchItem]);
  if (isFetching) return "Loding...";
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search CryptoCurrency"
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank} . ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price : {millify(currency.price)}</p>
                <p>Market Cap : {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Cryptocurrencies;
