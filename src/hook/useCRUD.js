import { useEffect, useState } from "react";
import request from "../server";
import { Form, Modal } from "antd";

const useCRUD = ({ url, initialData, otherParams }) => {
  const [allData, setAllData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [form] = Form.useForm();
  const [callBack, setCallBack] = useState(false);

  const refetch = () => {
    setCallBack(!callBack);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        let { data } = await request.get(url, {
          params: otherParams ? JSON.parse(otherParams) : {},
        });
        data = data.map((el) => {
          el.key = el.id;
          return el;
        });
        setAllData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url, callBack, otherParams]);

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
    setSelected(null);
    setIsModalLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected === null) {
        setIsModalLoading(true);
        await request.post(url, values);
      } else {
        await request.put(`${url}/${selected}`, values);
      }
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (id) => {
    try {
      setIsModalOpen(true);
      setSelected(id);

      let { data } = await request.get(`${url}/${id}`);
      form.setFieldsValue(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = (id) => {
    Modal.confirm({
      title: "Do you want to exit",
      onOk: async () => {
        await request.delete(`${url}/${id}`);
        refetch();
      },
    });
  };

  return {
    allData,
    loading,
    isModalOpen,
    isModalLoading,
    selected,
    form,
    showModal,
    closeModal,
    handleOk,
    editData,
    deleteData,
  };
};

export default useCRUD;
