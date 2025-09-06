import React, {  useState } from "react";
import { Pie, Line } from "react-chartjs-2";
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
  const [newPlan, setNewPlan] = useState({ plan: "", description: "", amount: "", date: "", type: "" });
  const [plans, setPlans] = useState([
    {
      _id: "1",
      plan: "Buy Seeds",
      description: "Purchase hybrid rice seeds for next season",
      amount: "5000",
      date: "2025-09-01",
      type: "expense",
    },
    {
      _id: "2",
      plan: "Sell Wheat",
      description: "Sold 1000kg wheat to local market",
      amount: "25000",
      date: "2025-09-03",
      type: "income",
    },
    {
      _id: "3",
      plan: "Fertilizer Purchase",
      description: "Buy organic fertilizer for field",
      amount: "3000",
      date: "2025-09-05",
      type: "expense",
    },
    {
      _id: "4",
      plan: "Tractor Maintenance",
      description: "Annual maintenance of tractor",
      amount: "2000",
      date: "2025-09-07",
      type: "expense",
    },
    {
      _id: "5",
      plan: "Invest in Drip Irrigation",
      description: "Install drip irrigation system for vegetable plot",
      amount: "12000",
      date: "2025-09-10",
      type: "investment",
    },
    {
      _id: "6",
      plan: "Sell Vegetables",
      description: "Sold tomatoes and cucumbers at city market",
      amount: "8000",
      date: "2025-09-12",
      type: "income",
    },
  ]);
  const [updatedPlan, setUpdatedPlan] = useState({ plan: "" });
  const [isEditing, setIsEditing] = useState(null);

  // Labels
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

  // Dashboard labels
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
  const allPlansLabel = useTextLang("All Plans", "सबै योजनाहरू");
  const addNewPlanBtnLabel = useTextLang("Add New Plan", "नयाँ योजना थप्नुहोस्");
  const noPlansFoundLabel = useTextLang("No plans found.", "कोई योजना नहीं मिली।");

  // Tabs
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

  // Chart data (static for demo)
  const pieData = {
    labels: [incomeLabelShort, expensesLabelShort],
    datasets: [
      {
        label: rsLabel,
        data: [
          plans.filter((p) => p.type === "income").reduce((a, b) => a + Number(b.amount || 0), 0),
          plans.filter((p) => p.type === "expense").reduce((a, b) => a + Number(b.amount || 0), 0),
        ],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: ["#16a34a", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: useTextLang(
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मई", "जुन", "जुलाई"]
    ),
    datasets: [
      {
        label: incomeLabelShort,
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#22c55e",
      },
      {
        label: expensesLabelShort,
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "#ef4444",
      },
    ],
  };

  // Add new plan
  const handleBusinessPlan = () => {
    if (!newPlan.plan) return;
    setPlans((prev) => [
      ...prev,
      {
        ...newPlan,
        _id: Date.now().toString(),
      },
    ]);
    setNewPlan({ plan: "", description: "", amount: "", date: "", type: "" });
    setCreate(false);
  };

  const investmentPlans = plans.filter((plan) => plan.type === "investment");

  const handleUpdatePlan = () => {
    setPlans((prev) =>
      prev.map((plan, idx) =>
        idx === isEditing ? { ...plan, ...updatedPlan } : plan
      )
    );
    setIsEditing(null);
  };

  // Delete plan
  const handleDeletePlan = (id) => {
    setPlans((prev) => prev.filter((plan) => plan._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] py-8 px-3">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl  font-bold text-green-900 mb-1 text-center">
          {useTextLang("Farm & Business Financial Diary", "कृषि तथा व्यवसायिक वित्तीय डायरी")}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {useTextLang(
            "Track your agricultural and business finances with ease",
            "आफ्नो कृषि र व्यवसायको वित्तीय गतिविधिहरूलाई सजिलैसँग ट्र्याक गर्नुहोस्"
          )}
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {summary.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl border border-green-100 bg-white shadow-sm p-5 flex flex-col justify-between min-h-[120px]`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-600">{item.label}</span>
                {item.icon}
              </div>
              <div className={`text-2xl font-semibold ${item.color}`}>
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
              className={`px-4 py-2 mx-1 rounded-full text-sm font-medium border transition-colors duration-200
        ${activePanel === tab.key
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-green-200 hover:bg-gray-50"
                }`}
              onClick={() => setActivePanel(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {activePanel === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl border border-green-100 shadow-sm p-5 ">
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
            <div className="bg-white rounded-xl border border-green-100 shadow-sm p-5 ">
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
          <div className="bg-white rounded-xl border border-green-100 shadow-sm p-4 mb-8 ">
            <h2 className="text-lg font-bold text-gray-700 mb-4">{transactionsPanelLabel}</h2>
            {plans && plans.length > 0 ? (
              plans.map((plan, index) => (
                <div
                  key={plan._id}
                  className="flex items-center justify-between border-b last:border-b-0 py-3 hover:bg-gray-50 transition"
                >
                  <Link className="flex items-center flex-1" to={`diary/${plan._id}`}>
                    <FaCalendarAlt className="text-green-500 mr-3 text-xl" />
                    <div>
                      <h3 className="text-base font-medium text-gray-800">{plan.plan}</h3>
                      <p className="text-xs text-gray-400">
                        {plan.date ? `Date: ${plan.date}` : ""}
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-green-600">
                      {plan.amount ? `${rsLabel}${plan.amount}` : ""}
                    </span>
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
          <div className="bg-white rounded-xl border border-green-100 shadow-sm p-4 mb-8 ">
            <h2 className="text-lg font-bold text-gray-700 mb-4">{investmentsPanelLabel}</h2>
            {investmentPlans.length > 0 ? (
              investmentPlans.map((plan) => (
                <div
                  key={plan._id}
                  className="flex items-center justify-between border-b last:border-b-0 py-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center flex-1">
                    <FaCalendarAlt className="text-green-500 mr-3 text-xl" />
                    <div>
                      <h3 className="text-base font-medium text-gray-800">{plan.plan}</h3>
                      <p className="text-xs text-gray-400">
                        {plan.date ? `Date: ${plan.date}` : ""}
                      </p>
                      <p className="text-xs text-gray-500">{plan.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-green-600">
                      {plan.amount ? `${rsLabel}${plan.amount}` : ""}
                    </span>
                    <FaEdit
                      className="text-blue-500 cursor-pointer hover:text-blue-700"
                      onClick={() => {
                        setIsEditing(plans.findIndex((p) => p._id === plan._id));
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
              <p className="text-center text-gray-400 py-8">{noInvestmentsLabel}</p>
            )}
          </div>
        )}


        {activePanel === "analytics" && (
          <div className="bg-white rounded-xl border border-green-100 shadow-sm p-4 mb-8 ">
            <h2 className="text-lg font-bold text-gray-700 mb-4">{analyticsPanelLabel}</h2>
            <p className="text-center text-gray-400 py-8">{analyticsComingLabel}</p>
          </div>
        )}

        {/* All Plans Section */}
        <div className="flex items-center justify-between mb-4 mt-10">
          <h2 className="text-lg font-bold text-gray-700">{allPlansLabel}</h2>
          <button
            onClick={() => setCreate(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
          >
            {addNewPlanBtnLabel}
          </button>
        </div>
        <div className="bg-white rounded-xl shadow p-4 ">
          {plans && plans.length > 0 ? (
            plans.map((plan, index) => (
              <div
                key={plan._id}
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
                    <p className="text-xs text-gray-400">
                      {plan.date ? `Date: ${plan.date}` : ""}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center space-x-3">
                  {isEditing === index ? (
                    <button
                      onClick={handleUpdatePlan}
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
            <p className="text-center text-gray-400 py-8">{noPlansFoundLabel}</p>
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