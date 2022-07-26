import { Button, Flex, Text } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteProduct, fetchProductList } from "../../../api";
import { Table, Popconfirm } from "antd";
import { Link } from "react-router-dom";

export default function Products() {
  const { isLoading, isError, data, error } = useQuery(
    ["admin:products"],
    fetchProductList
  );

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Link to={`/admin/products/${record._id}`}>Edit</Link>
          <Popconfirm
            title="Are you sure?"
            onCancel={() => {}}
            onConfirm={() => {
              deleteMutation.mutate(record._id, {});
            }}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <a href="/#" style={{ marginLeft: 10 }}>
              Delete
            </a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Flex justifyContent={"space-between"} alignItems="center">
        <Text fontSize={"2xl"} p="5">
          Products
        </Text>
        <Link to="new">
          <Button>New</Button>
        </Link>
      </Flex>
      <Table columns={columns} dataSource={data} rowKey="_id" />;
    </div>
  );
}
