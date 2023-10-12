import { Fragment, useState } from "react";
import { Button, Flex, Form, Image, Input, Modal, Space, Table } from "antd";

import {
  UserAddOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import useCRUD from "../hook/useCRUD";
import Search from "antd/es/input/Search";

const TeacherStudentsPage = () => {
  const { teacherId } = useParams();
  const [search, setSearch] = useState("");

  const {
    allData: students,
    loading,
    isModalOpen,
    isModalLoading,
    selected,
    form,
    showModal,
    closeModal,
    handleOk,
    editData: editStudent,
    deleteData: deleteStudent,
  } = useCRUD({
    url: `teachers/${teacherId}/student`,
    initialData: [],
    otherParams: JSON.stringify({ search }),
  });

  const submit = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (img) => <Image height={50} src={img} />,
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (id) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => editStudent(id)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteStudent(id)}
            danger
            type="primary"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex align="center" justify="space-between">
            <h1>Students ({students.length})</h1>
            <Form
              name="search"
              wrapperCol={{
                span: 24,
              }}
              style={{
                width: 400,
              }}
              autoComplete="off"
            >
              <Space.Compact style={{ width: "100%" }}>
                <Search
                  onChange={submit}
                  placeholder="input search text"
                  allowClear
                />
              </Space.Compact>
            </Form>
            <Button
              type="dashed"
              onClick={showModal}
              icon={<UserAddOutlined />}
            >
              Add Student
            </Button>
          </Flex>
        )}
        loading={loading}
        dataSource={students}
        columns={columns}
      />
      <Modal
        title="Student data"
        okText={selected === null ? "Add" : "Save"}
        okButtonProps={{
          icon: selected === null ? <UserAddOutlined /> : <SaveOutlined />,
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        maskClosable={false}
        confirmLoading={isModalLoading}
      >
        <Form
          name="student"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Firstname"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default TeacherStudentsPage;
