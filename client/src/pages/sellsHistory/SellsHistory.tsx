import { useState } from "react";
import { Table, Select } from "antd";
import { useGetAllSellQuery } from "../../redux/features/sells/sellsApi";
import Loader from "../../components/utils/Loader";
import moment from "moment";

const { Option } = Select;

const SellsHistory = () => {
  const [category, setCategory] = useState("");
  const {
    data: sellsData,
    isLoading,
  } = useGetAllSellQuery(category, { pollingInterval: 100 });

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "selling Date",
      dataIndex: "sellingDate",
      key: "sellingDate",
      render: (text:string) =>  moment(text).format('LLL')
    },
   
   
    {
      title: "Buyer",
      dataIndex: "buyerName",
      key: "buyerName",
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

 

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sells History</h1>
      <div style={styles.categorySelector}>
        <label style={styles.label}>Select Category:</label>
        <Select
          style={styles.select}
          defaultValue=""
          onChange={(value) => setCategory(value)}
        >
          <Option value="">All</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="daily">Daily</Option>
          <Option value="monthly">Monthly</Option>
          <Option value="yearly">Yearly</Option>
        </Select>
      </div>

      <Table
        dataSource={sellsData?.data || []}
        columns={columns}
        pagination={false}
        scroll={{ x: true }}
        style={styles.table}
      />
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  header: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  categorySelector: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  label: {
    marginRight: "10px",
    fontSize: "14px",
    color: "#555",
  },
  select: {
    width: "150px",
  },
  table: {
    marginTop: "20px",
  },
};

export default SellsHistory;