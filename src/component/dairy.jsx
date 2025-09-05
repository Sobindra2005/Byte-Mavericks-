import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
// import { createItem, getItems, deleteItem } from "../../api/api";
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { Link } from "react-router-dom";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);
import { useTextLang } from "../libs/utils"



const Diary = () => {
  const [activePanel, setActivePanel] = useState("dashboard");
  const [create, setCreate] = useState(false);
  const [newPlan, setNewPlan] = useState({ plan: "", email: `` });
  const [plans, setPlans] = useState([]);
  const [updatedPlan, setUpdatedPlan] = useState({ plan: "" });
  const [isEditing, setIsEditing] = useState(null);

  const addNewPlanLabel = useTextLang("Add New Plan", "नयाँ योजना थप्नुहोस्");
  const planNameLabel = useTextLang("Plan Name", "योजना नाम");
  const descriptionLabel = useTextLang("Description", "विवरण");
  const describePlanPlaceholder = useTextLang("Describe your plan", "तपाईंको योजनाको वर्णन गर्नुहोस्");
  const amountLabel = useTextLang("Amount (Rs.)", "रु.मा रकम");
  const dateLabel = useTextLang("Date", "मिति");
  const typeLabel = useTextLang("Type", "प्रकार");
  const selectTypeLabel = useTextLang("Select type", "प्रकार चयन गर्नुहोस्");
  const incomeLabel = useTextLang("Income", "आय");
  const expenseLabel = useTextLang("Expense", "खर्च");
  const investmentLabel = useTextLang("Investment", "निवेश");
  const cancelLabel = useTextLang("Cancel", "रद्द गर्नुहोस्");
  const addPlanLabel = useTextLang("Add Plan", "योजना थप्नुहोस्");

  const pieData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Rs.",
        data: [300, 50],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: ["#16a34a", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: useTextLang(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मई", "जुन", "जुलाई"]),
    datasets: [
      {
        label: useTextLang("Income", "आम्दानी"),
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#22c55e",
      },
      {
        label: useTextLang("Expenses", "खर्च"),
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "#ef4444",
      },
    ],
  };

  function updateEmail() {
    // return getCurrentUser().then((user) => {
    //   setNewPlan((prevPlan) => ({ ...prevPlan, email: user.email }));
    // });
  }

  const handleDeletePlan = async (id) => {
    // await deleteItem(`deletePlan/${id}`);
    // fetchBusinessPlans()
    //   .then((response) => setPlans(response))
    //   .catch((error) => console.error("Error fetching business plans:", error));
  };

  const handleBusinessPlan = async () => {
    // await updateEmail();
    // setTimeout(async () => {
    //   await createItem("createPlan", newPlan);
    //   fetchBusinessPlans()
    //     .then((response) => setPlans(response))
    //     .catch((error) => console.error("Error fetching business plans:", error));
    //   setCreate(false);
    // }, 0);
  };

  const fetchBusinessPlans = async () => {
    // const userData = await getCurrentUser();
    // const response = await getItems(`readPlans/${userData.email}`);
    // return response;
  };

  useEffect(() => {
    // fetchBusinessPlans()
    //   .then((response) => setPlans(response))
    //   .catch((error) => console.error("Error fetching business plans:", error));
  }, []);

  // Example summary data (replace with real data)
  const rsLabel = useTextLang("Rs.", "₹");
  const netProfitLabel = useTextLang("Net Profit/Loss", "शुद्ध नाफा/नोक्सान");
  const netProfitDesc = useTextLang("Profit this period", "यस अवधिको नाफा");
  const totalRevenueLabel = useTextLang("Total Revenue", "कुल राजस्व");
  const totalRevenueDesc = useTextLang("1 income transactions", "१ आम्दानी कारोबारहरू");
  const totalExpensesLabel = useTextLang("Total Expenses", "कुल खर्च");
  const totalExpensesDesc = useTextLang("0 expense transactions", "० खर्च कारोबारहरू");
  const investmentPLLabel = useTextLang("Investment P&L", "लगानी नाफा/नोक्सान");
  const investmentPLDesc = useTextLang(
    `Portfolio value: ${rsLabel}997.00`,
    `पोर्टफोलियो मूल्य: ${rsLabel}997.00`
  );

  const summary = [
    {
      label: netProfitLabel,
      value: 100,
      desc: netProfitDesc,
      icon: <span className="inline-block text-green-600">&#8593;</span>,
      color: "text-green-600",
      border: "border-green-100",
      bg: "bg-white",
      valuePrefix: rsLabel,
    },
    {
      label: totalRevenueLabel,
      value: 100,
      desc: totalRevenueDesc,
      icon: <span className="inline-block text-green-600">Rs</span>,
      color: "text-green-600",
      border: "border-green-100",
      bg: "bg-white",
      valuePrefix: rsLabel,
    },
    {
      label: totalExpensesLabel,
      value: 0,
      desc: totalExpensesDesc,
      icon: <span className="inline-block text-green-600">&#128179;</span>,
      color: "text-green-600",
      border: "border-green-100",
      bg: "bg-white",
      valuePrefix: rsLabel,
    },
    {
      label: investmentPLLabel,
      value: -3,
      desc: investmentPLDesc,
      icon: <span className="inline-block text-red-600">&#8595;</span>,
      color: "text-red-600",
      border: "border-red-100",
      bg: "bg-white",
      valuePrefix: rsLabel,
    },
  ];

  const dashboardLabel = useTextLang("Dashboard", "ड्यासबोर्ड");
  const transactionsLabel = useTextLang("Transactions", "कारोबारहरू");
  const investmentsLabel = useTextLang("Investments", "लगानीहरू");
  const analyticsLabel = useTextLang("Analytics", "विश्लेषण");

  const tabs = [
    { key: "dashboard", label: dashboardLabel },
    { key: "transactions", label: transactionsLabel },
    { key: "investments", label: investmentsLabel },
    { key: "analytics", label: analyticsLabel },
  ];

  const revenueVsExpensesLabel = useTextLang("Revenue vs Expenses", "आय र खर्च");
  const distributionLabel = useTextLang("Distribution of your financial activity", "तपाईंको वित्तीय गतिविधिको वितरण");
  const incomeLabelShort = useTextLang("Income", "आय");
  const expensesLabelShort = useTextLang("Expenses", "खर्च");
  const monthlyTrendLabel = useTextLang("Monthly Financial Trend", "महिनावारी वित्तीय प्रवृत्ति");
  const trendDescLabel = useTextLang("Revenue and expenses over time", "समयको साथमा आय र खर्च");
  const transactionsPanelLabel = useTextLang("Transactions", "कारोबारहरू");
  const noTransactionsLabel = useTextLang("No transactions found.", "कोई कारोबार नहीं मिला।");
  const investmentsPanelLabel = useTextLang("Investments", "निवेशहरू");
  const noInvestmentsLabel = useTextLang("No investment data available.", "कोई निवेश डेटा उपलब्ध नहीं है।");
  const analyticsPanelLabel = useTextLang("Analytics", "विश्लेषण");
  const analyticsComingLabel = useTextLang("Analytics coming soon.", "विश्लेषण चाँडै आउनेछ।");


  return (
    <div className="min-h-screen bg-[#fafbfc] py-8 px-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">{useTextLang("Farm & Business Financial Diary", "कृषि तथा व्यवसायिक वित्तीय डायरी")}</h1>
        <p className="text-center text-gray-500 mb-8">{useTextLang("Track your agricultural and business finances with ease", "आफ्नो कृषि र व्यवसायको वित्तीय गतिविधिहरूलाई सजिलैसँग ट्र्याक गर्नुहोस्")}</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {summary.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow border ${item.border} ${item.bg} p-6 flex flex-col justify-between min-h-[120px]`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-600">{item.label}</span>
                {item.icon}
              </div>
              <div className={`text-2xl font-extrabold ${item.color}`}>
                {item.value < 0 ? "-" : ""}
                {item.valuePrefix}
                {Math.abs(item.value).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-6 py-2 mx-1 rounded font-semibold transition-colors duration-200
        ${activePanel === tab.key
                  ? "bg-green-100 text-green-700 "
                  : "bg-white text-gray-700  hover:bg-gray-100"
                }`}
              onClick={() => setActivePanel(tab.key)}
            >
              {tab.label}
            </button>
          ))}

        </div>
        {activePanel === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow p-6 ">
              <h2 className="text-lg font-bold text-gray-700 mb-2">{revenueVsExpensesLabel}</h2>
              <p className="text-gray-500 text-sm mb-2">{distributionLabel}</p>
              <Pie data={pieData} />
              <div className="flex justify-center gap-4 mt-4">
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span> {incomeLabelShort}
                </span>
                <span className="flex items-center gap-1 text-red-500 text-sm">
                  <span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span> {expensesLabelShort}
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 ">
              <h2 className="text-lg font-bold text-gray-700 mb-2">{monthlyTrendLabel}</h2>
              <p className="text-gray-500 text-sm mb-2">{trendDescLabel}</p>
              <Line data={lineData} />
              <div className="flex justify-center gap-4 mt-4">
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>{incomeLabelShort}
                </span>
                <span className="flex items-center gap-1 text-red-500 text-sm">
                  <span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span>{expensesLabelShort}
                </span>
              </div>
            </div>
          </div>
        )}

        {activePanel === "transactions" && (
          <div className="bg-white rounded-xl shadow p-4 mb-8 ">
            <h2 className="text-lg font-bold text-gray-700 mb-4">{transactionsPanelLabel}</h2>
            {plans && plans.length > 0 ? (
              plans.map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between  py-3 hover:bg-gray-50 transition"
                >
                  <Link className="flex items-center flex-1" to={`diary/${plan._id}`}>
                    <FaCalendarAlt className="text-green-500 mr-3 text-xl" />
                    <div>
                      <h3 className="text-base font-medium text-gray-800">{plan.plan}</h3>
                      <p className="text-xs text-gray-400">Date: ०१/०१/२०२४</p>
                    </div>
                  </Link>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-green-600">Rs.1000</span>
                    <FaEdit
                      className="text-blue-500 cursor-pointer hover:text-blue-700"
                      onClick={() => {
                        setIsEditing(index);
                        setUpdatedPlan(plan);
                      }}
                    />
                    <FaTrash
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleDeletePlan(plan._id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">{noTransactionsLabel}</p>
            )}
          </div>
        )}

        {activePanel === "investments" && (
          <div className="bg-white rounded-xl shadow p-4 mb-8 ">
            <h2 className="text-lg font-bold text-gray-700 mb-4">{investmentsPanelLabel}</h2>
            <p className="text-center text-gray-400 py-8">{noInvestmentsLabel}</p>
          </div>
        )}

        {activePanel === "analytics" && (
          <div className="bg-white rounded-xl shadow p-4 mb-8 ">
            <h2 className="text-lg font-bold text-gray-700 mb-4">{analyticsPanelLabel}</h2>
            <p className="text-center text-gray-400 py-8">{analyticsComingLabel}</p>
          </div>
        )}

        {/* All Plans Section */}
        <div className="flex items-center justify-between mb-4 mt-10">
          <h2 className="text-lg font-bold text-gray-700">{useTextLang("All Plans", "सबै योजनाहरू")}</h2>
          <button
            onClick={() => setCreate(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
          >
            {useTextLang("Add New Plan", "नयाँ योजना थप्नुहोस्")}
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-4 ">
          {plans && plans.length > 0 ? (
            plans.map((plan, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b last:border-b-0 py-3 hover:bg-gray-50 transition"
              >
                <Link className="flex items-center flex-1" to={`/business-diary/${plan._id}`}>
                  <FaCalendarAlt className="text-green-500 mr-3 text-xl" />
                  <div>
                    {isEditing === index ? (
                      <input
                        type="text"
                        value={updatedPlan.plan}
                        onChange={(e) =>
                          setUpdatedPlan({
                            ...updatedPlan,
                            plan: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-green-400"
                      />
                    ) : (
                      <h3 className="text-base font-medium text-gray-800">{plan.plan}</h3>
                    )}
                    <p className="text-xs text-gray-400">Date: ०१/०१/२०२४</p>
                  </div>
                </Link>
                <div className="flex items-center space-x-3">
                  {isEditing === index ? (
                    <button
                      onClick={() => setIsEditing(null)}
                      className="bg-green-600 text-white px-3 py-1 rounded shadow"
                    >
                      Update
                    </button>
                  ) : (
                    <>
                      <FaEdit
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => {
                          setIsEditing(index);
                          setUpdatedPlan(plan);
                        }}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeletePlan(plan._id)}
                      />
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">{useTextLang("No plans found.", "कोई योजना नहीं मिली।")}</p>
          )}
        </div>



        {/* Modal for New Plan */}
        {create && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-lg ">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">{addNewPlanLabel}</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 font-semibold">{planNameLabel}</label>
                <input
                  type="text"
                  value={newPlan.plan}
                  onChange={(e) => setNewPlan({ ...newPlan, plan: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                  placeholder="Enter plan name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 font-semibold">{descriptionLabel}</label>
                <textarea
                  value={newPlan.description || ""}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                  placeholder={describePlanPlaceholder}
                  rows={2}
                />
              </div>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1 font-semibold">{amountLabel}</label>
                  <input
                    type="number"
                    value={newPlan.amount || ""}
                    onChange={(e) => setNewPlan({ ...newPlan, amount: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1 font-semibold">{dateLabel}</label>
                  <input
                    type="date"
                    value={newPlan.date || ""}
                    onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-1 font-semibold">{typeLabel}</label>
                <select
                  value={newPlan.type || ""}
                  onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-green-400"
                >
                  <option value="">{selectTypeLabel}</option>
                  <option value="income">{incomeLabel}</option>
                  <option value="expense">{expenseLabel}</option>
                  <option value="investment">{investmentLabel}</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setCreate(false)}
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={handleBusinessPlan}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  {addPlanLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diary;