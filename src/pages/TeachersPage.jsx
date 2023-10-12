import { Fragment, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
} from "antd";

import {
  UserAddOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useCRUD from "../hook/useCRUD";
import Search from "antd/es/input/Search";

const TeachersPage = () => {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selected, setSelected] = useState(null);
  // const [isModalLoading, setIsModalLoading] = useState(false);
  // const [form] = Form.useForm();

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     setLoading(true);
  //     let { data } = await request.get("teachers");
  //     data = data.map((el) => {
  //       el.key = el.id;
  //       return el;
  //     });
  //     setData(data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const showModal = () => {
  //   form.resetFields();
  //   setIsModalOpen(true);
  //   setSelected(null);
  //   setIsModalLoading(false);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleOk = async () => {
  //   try {
  //     let values = await form.validateFields();
  //     if (selected === null) {
  //       setIsModalLoading(true);
  //       await request.post("teachers", values);
  //     } else {
  //       await request.put(`teachers/${selected}`, values);
  //     }
  //     getData();
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const editTeacher = async (id) => {
  //   try {
  //     setIsModalOpen(true);
  //     setSelected(id);

  //     let { data } = await request.get(`teachers/${id}`);
  //     form.setFieldsValue(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteTeacher = (id) => {
  //   Modal.confirm({
  //     title: "Do you want to exit",
  //     onOk: async () => {
  //       await request.delete(`teachers/${id}`);
  //       getData();
  //     },
  //   });
  // };

  const [search, setSearch] = useState("");

  const {
    allData: teachers,
    loading,
    isModalOpen,
    isModalLoading,
    selected,
    form,
    showModal,
    closeModal,
    handleOk,
    editData: editTeacher,
    deleteData: deleteTeacher,
  } = useCRUD({
    url: "teachers",
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
      title: "IsMarried",
      dataIndex: "isMarried",
      key: "isMarried",
      render: (isMarried) => (isMarried ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (id) => (
        <Space size="middle">
          <Link to={`/teachers/${id}`}>
            <Button type="dashed">See students</Button>
          </Link>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => editTeacher(id)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteTeacher(id)}
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
            <h1>Teachers ({teachers.length})</h1>
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
              Add teacher
            </Button>
          </Flex>
        )}
        loading={loading}
        dataSource={teachers}
        columns={columns}
      />
      <Modal
        title="Teacher data"
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
          name="teacher"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            isMarried: false,
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

          <Form.Item
            name="isMarried"
            valuePropName="checked"
            wrapperCol={{
              span: 24,
            }}
          >
            <Checkbox>Is married?</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default TeachersPage;
