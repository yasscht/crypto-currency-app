import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import millify from "millify";
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const { Title } = Typography;
  const coinPrice = coinHistory?.data?.history.map((history) => history.price);
  const coinTimestamp = coinHistory?.data?.history.map((history) =>
    new Date(history.timestamp).toLocaleDateString()
  );
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change} %{" "}
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price : $ {millify(currentPrice)}{" "}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
