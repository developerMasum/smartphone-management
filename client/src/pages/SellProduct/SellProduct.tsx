import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  DatePicker,
  InputNumber,
  Spin,
} from "antd";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { useCreateSellMutation } from "../../redux/features/sells/sellsApi";

const SellProduct = () => {
  const { data, isLoading } = useGetAllProductsQuery("", {
    pollingInterval: 1000,
  });

  const [createSell, { isLoading: isCreatingSell }] =
    useCreateSellMutation();

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button onClick={() => handleSell(record)} danger>
          Sell
        </Button>
      ),
    },
  ];

  const filteredData = data?.data?.filter((item: { [s: string]: unknown; } | ArrayLike<unknown>) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSell = (product: any) => {
    setSelectedProduct(product);
    setIsModalVisible(true);

    // Set default values for the "Buyer Name" and "Selling Date" fields
    form.setFieldsValue({
      productName: product.productName,
      productQuantity: undefined, // Clear previous value
      buyerName: "", // Set default buyer name
      sellingDate: undefined, // Set default selling date
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: {
    productId: string;
    productName: string;
    productQuantity: number;
    buyerName: string;
    sellingDate: string;
  }) => {
    try {
      const productId = selectedProduct?._id;
      if (!productId) {
        throw new Error("Invalid product ID");
      }

      const updatedValues = { ...values, productId };
      await createSell(updatedValues);

      // Optionally perform any actions after successful submission
      console.log("Sell created successfully");

      // Close the modal
      setIsModalVisible(false);
      toast.success("Sell created successfully");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Input
        placeholder="Search by name, brand, quantity, price, category"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={filteredData} rowKey="_id" />
      </Spin>

      <Modal
        title="Sell Product Now"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="sell"
            danger
            onClick={() => form.submit()}
            loading={isCreatingSell}
          >
            Sell Product
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Product Name" name="productName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Product Quantity" name="productQuantity">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Buyer Name" name="buyerName">
            <Input />
          </Form.Item>
          <Form.Item label="Selling Date" name="sellingDate">
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SellProduct;
