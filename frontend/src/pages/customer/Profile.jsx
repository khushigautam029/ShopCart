
import { useState } from "react";
import toast from "react-hot-toast";
import {
    FiCheckCircle,
    FiEdit2,
    FiHeart,
    FiMail,
    FiMapPin,
    FiPhone,
    FiPlus,
    FiSave,
    FiShoppingBag,
    FiShoppingCart,
    FiTrash2,
    FiUser,
    FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const initialProfile = {
    name: "Khushi Gautam",
    email: "khushi@example.com",
    phone: "9876543210",
};

const initialAddresses = [
    {
        id: 1,
        name: "Khushi Gautam",
        phone: "9876543210",
        address: "House No. 24, Vaishali Nagar",
        landmark: "Near Central Park",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302021",
        type: "Home",
        isDefault: true,
    },
    {
        id: 2,
        name: "Khushi Gautam",
        phone: "9876543210",
        address: "Flat No. 302, Malviya Nagar",
        landmark: "Near Gaurav Tower",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302017",
        type: "Work",
        isDefault: false,
    },
];

const emptyAddress = {
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
    isDefault: false,
};

const Profile = () => {
    const [activeTab, setActiveTab] = useState("profile");

    const [profile, setProfile] = useState(initialProfile);
    const [editProfile, setEditProfile] = useState(false);
    const [profileForm, setProfileForm] = useState(initialProfile);

    const [addresses, setAddresses] = useState(initialAddresses);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressForm, setAddressForm] = useState(emptyAddress);
    const [editingAddressId, setEditingAddressId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteAddressId, setDeleteAddressId] = useState(null);

    const inputClass =
        "w-full border border-[#E9E0F5] rounded-xl px-4 py-3 text-sm text-[#30283B] outline-none focus:border-[#7652A5] focus:ring-2 focus:ring-[#E9E0F5]";

    const handleProfileChange = (e) => {
        const { name, value } = e.target;

        setProfileForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const saveProfile = (e) => {
        e.preventDefault();
        setProfile(profileForm);
        setEditProfile(false);
        toast.success("Profile updated successfully");
    };

    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target;

        setAddressForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const openAddAddress = () => {
        setAddressForm(emptyAddress);
        setEditingAddressId(null);
        setShowAddressForm(true);
    };

    const openEditAddress = (address) => {
        setAddressForm({ ...address });
        setEditingAddressId(address.id);
        setShowAddressForm(true);
    };

    const saveAddress = (e) => {
        e.preventDefault();

        if (addressForm.isDefault || addresses.length === 0) {
            setAddresses((previous) =>
                previous.map((address) => ({
                    ...address,
                    isDefault: false,
                }))
            );
        }

        if (editingAddressId) {
            setAddresses((previous) =>
                previous.map((address) =>
                    address.id === editingAddressId
                        ? { ...addressForm, id: editingAddressId }
                        : {
                              ...address,
                              isDefault: addressForm.isDefault
                                  ? false
                                  : address.isDefault,
                          }
                )
            );

            toast.success("Address updated successfully");
        } else {
            const newAddress = {
                ...addressForm,
                id: Date.now(),
                isDefault:
                    addressForm.isDefault || addresses.length === 0,
            };

            setAddresses((previous) => [
                ...previous.map((address) => ({
                    ...address,
                    isDefault: newAddress.isDefault
                        ? false
                        : address.isDefault,
                })),
                newAddress,
            ]);

            toast.success("Address added successfully");
        }

        setShowAddressForm(false);
        setAddressForm(emptyAddress);
        setEditingAddressId(null);
    };

    const makeDefault = (id) => {
        setAddresses((previous) =>
            previous.map((address) => ({
                ...address,
                isDefault: address.id === id,
            }))
        );

        toast.success("Default address updated");
    };

    const confirmDelete = () => {
        setAddresses((previous) =>
            previous
                .filter((address) => address.id !== deleteAddressId)
                .map((address, index, remaining) => ({
                    ...address,
                    isDefault:
                        address.isDefault ||
                        (remaining.every((item) => !item.isDefault) &&
                            index === 0),
                }))
        );

        setShowDeleteModal(false);
        setDeleteAddressId(null);
        toast.success("Address deleted successfully");
    };

    const initials = profile.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="min-h-screen bg-[#F8F6FB] py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#30283B]">
                        My Account
                    </h1>
                    <p className="text-[#77717F] mt-2">
                        Manage your personal information and delivery addresses.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-[#E9E0F5] p-5">
                            <div className="flex flex-col items-center text-center pb-6 border-b border-[#F0EBF6]">
                                <div className="w-20 h-20 rounded-full bg-[#E9E0F5] text-[#7652A5] flex items-center justify-center text-2xl font-bold">
                                    {initials}
                                </div>

                                <h2 className="font-bold text-lg text-[#30283B] mt-3">
                                    {profile.name}
                                </h2>

                                <p className="text-sm text-[#77717F] mt-1">
                                    {profile.email}
                                </p>

                                <span className="mt-3 text-xs font-semibold bg-[#F1EAF8] text-[#7652A5] px-4 py-1.5 rounded-full">
                                    Customer Account
                                </span>
                            </div>

                            <nav className="mt-5 space-y-2">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                                        activeTab === "profile"
                                            ? "bg-[#F1EAF8] text-[#7652A5]"
                                            : "text-[#77717F] hover:bg-[#F8F6FB]"
                                    }`}
                                >
                                    <FiUser size={18} />
                                    Personal Information
                                </button>

                                <button
                                    onClick={() => setActiveTab("addresses")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                                        activeTab === "addresses"
                                            ? "bg-[#F1EAF8] text-[#7652A5]"
                                            : "text-[#77717F] hover:bg-[#F8F6FB]"
                                    }`}
                                >
                                    <FiMapPin size={18} />
                                    My Addresses
                                    <span className="ml-auto text-xs">
                                        {addresses.length}
                                    </span>
                                </button>

                                <Link
                                    to="/orders"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#77717F] hover:bg-[#F8F6FB]"
                                >
                                    <FiShoppingBag size={18} />
                                    My Orders
                                </Link>

                                <Link
                                    to="/wishlist"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#77717F] hover:bg-[#F8F6FB]"
                                >
                                    <FiHeart size={18} />
                                    My Wishlist
                                </Link>

                                <Link
                                    to="/cart"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#77717F] hover:bg-[#F8F6FB]"
                                >
                                    <FiShoppingCart size={18} />
                                    My Cart
                                </Link>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3 space-y-6">

                        {activeTab === "profile" && (
                            <section className="bg-white rounded-2xl border border-[#E9E0F5] p-5 sm:p-7">
                                <div className="flex items-center justify-between gap-3 mb-7">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#30283B]">
                                            Personal Information
                                        </h2>
                                        <p className="text-sm text-[#77717F] mt-1">
                                            Your basic account details.
                                        </p>
                                    </div>

                                    {!editProfile && (
                                        <button
                                            onClick={() => {
                                                setProfileForm(profile);
                                                setEditProfile(true);
                                            }}
                                            className="flex items-center gap-2 text-sm font-semibold text-[#7652A5] hover:text-[#5E3F89]"
                                        >
                                            <FiEdit2 />
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={saveProfile}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                        <div>
                                            <label className="block text-sm font-medium text-[#30283B] mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                name="name"
                                                value={editProfile ? profileForm.name : profile.name}
                                                onChange={handleProfileChange}
                                                disabled={!editProfile}
                                                className={`${inputClass} disabled:bg-[#F8F6FB] disabled:text-[#77717F]`}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#30283B] mb-2">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A09AA8]" />
                                                <input
                                                    name="email"
                                                    type="email"
                                                    value={editProfile ? profileForm.email : profile.email}
                                                    onChange={handleProfileChange}
                                                    disabled={!editProfile}
                                                    className={`${inputClass} pl-11 disabled:bg-[#F8F6FB] disabled:text-[#77717F]`}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#30283B] mb-2">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A09AA8]" />
                                                <input
                                                    name="phone"
                                                    type="tel"
                                                    pattern="[0-9]{10}"
                                                    value={editProfile ? profileForm.phone : profile.phone}
                                                    onChange={handleProfileChange}
                                                    disabled={!editProfile}
                                                    className={`${inputClass} pl-11 disabled:bg-[#F8F6FB] disabled:text-[#77717F]`}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {editProfile && (
                                        <div className="flex flex-wrap gap-3 mt-7">
                                            <button
                                                type="submit"
                                                className="flex items-center gap-2 bg-[#7652A5] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#5E3F89]"
                                            >
                                                <FiSave />
                                                Save Changes
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setProfileForm(profile);
                                                    setEditProfile(false);
                                                }}
                                                className="border border-[#E9E0F5] text-[#77717F] px-6 py-3 rounded-xl text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </section>
                        )}

                        {activeTab === "addresses" && (
                            <section className="bg-white rounded-2xl border border-[#E9E0F5] p-5 sm:p-7">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#30283B]">
                                            My Addresses
                                        </h2>
                                        <p className="text-sm text-[#77717F] mt-1">
                                            Manage your saved delivery addresses.
                                        </p>
                                    </div>

                                    <button
                                        onClick={openAddAddress}
                                        className="flex items-center justify-center gap-2 bg-[#7652A5] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#5E3F89]"
                                    >
                                        <FiPlus />
                                        Add New Address
                                    </button>
                                </div>

                                {addresses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FiMapPin className="text-4xl text-[#C9B2E8] mx-auto mb-4" />
                                        <h3 className="font-bold text-[#30283B]">
                                            No saved addresses
                                        </h3>
                                        <p className="text-sm text-[#77717F] mt-2">
                                            Add an address to make checkout easier.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {addresses.map((address) => (
                                            <div
                                                key={address.id}
                                                className={`border rounded-2xl p-5 ${
                                                    address.isDefault
                                                        ? "border-[#7652A5] bg-[#FBF9FE]"
                                                        : "border-[#E9E0F5]"
                                                }`}
                                            >
                                                <div className="flex justify-between items-center gap-2 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-9 h-9 rounded-lg bg-[#F1EAF8] flex items-center justify-center text-[#7652A5]">
                                                            <FiMapPin />
                                                        </div>

                                                        <span className="font-semibold text-[#30283B]">
                                                            {address.type}
                                                        </span>
                                                    </div>

                                                    {address.isDefault && (
                                                        <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                                            <FiCheckCircle />
                                                            Default
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="font-semibold text-[#30283B]">
                                                    {address.name}
                                                </h3>

                                                <p className="text-sm text-[#77717F] mt-2 leading-6">
                                                    {address.address}
                                                    {address.landmark && (
                                                        <>
                                                            <br />
                                                            {address.landmark}
                                                        </>
                                                    )}
                                                    <br />
                                                    {address.city}, {address.state} - {address.pincode}
                                                </p>

                                                <p className="text-sm text-[#77717F] mt-2">
                                                    Phone: {address.phone}
                                                </p>

                                                <div className="border-t border-[#E9E0F5] mt-4 pt-4 flex flex-wrap items-center gap-4">
                                                    <button
                                                        onClick={() => openEditAddress(address)}
                                                        className="flex items-center gap-1 text-sm text-[#7652A5] font-medium"
                                                    >
                                                        <FiEdit2 />
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setDeleteAddressId(address.id);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="flex items-center gap-1 text-sm text-red-500 font-medium"
                                                    >
                                                        <FiTrash2 />
                                                        Delete
                                                    </button>

                                                    {!address.isDefault && (
                                                        <button
                                                            onClick={() => makeDefault(address.id)}
                                                            className="text-sm text-[#77717F] font-medium ml-auto"
                                                        >
                                                            Set Default
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Quick Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link
                                to="/orders"
                                className="bg-white border border-[#E9E0F5] rounded-xl p-5 hover:shadow-md transition"
                            >
                                <FiShoppingBag className="text-2xl text-[#7652A5] mb-3" />
                                <p className="font-semibold text-[#30283B]">
                                    My Orders
                                </p>
                                <p className="text-xs text-[#77717F] mt-1">
                                    Track your purchases
                                </p>
                            </Link>

                            <Link
                                to="/wishlist"
                                className="bg-white border border-[#E9E0F5] rounded-xl p-5 hover:shadow-md transition"
                            >
                                <FiHeart className="text-2xl text-[#7652A5] mb-3" />
                                <p className="font-semibold text-[#30283B]">
                                    Wishlist
                                </p>
                                <p className="text-xs text-[#77717F] mt-1">
                                    Your saved products
                                </p>
                            </Link>

                            <Link
                                to="/cart"
                                className="bg-white border border-[#E9E0F5] rounded-xl p-5 hover:shadow-md transition"
                            >
                                <FiShoppingCart className="text-2xl text-[#7652A5] mb-3" />
                                <p className="font-semibold text-[#30283B]">
                                    Shopping Cart
                                </p>
                                <p className="text-xs text-[#77717F] mt-1">
                                    Continue shopping
                                </p>
                            </Link>
                        </div>
                    </main>
                </div>
            </div>

            {/* Add / Edit Address Modal */}
            {showAddressForm && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-[#30283B]">
                                    {editingAddressId ? "Edit Address" : "Add New Address"}
                                </h2>
                                <p className="text-sm text-[#77717F] mt-1">
                                    Enter your delivery details.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowAddressForm(false)}
                                className="text-[#77717F] hover:text-red-500"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <form onSubmit={saveAddress}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    name="name"
                                    value={addressForm.name}
                                    onChange={handleAddressChange}
                                    placeholder="Full Name"
                                    className={inputClass}
                                    required
                                />

                                <input
                                    name="phone"
                                    type="tel"
                                    pattern="[0-9]{10}"
                                    value={addressForm.phone}
                                    onChange={handleAddressChange}
                                    placeholder="10-digit Phone Number"
                                    className={inputClass}
                                    required
                                />

                                <input
                                    name="address"
                                    value={addressForm.address}
                                    onChange={handleAddressChange}
                                    placeholder="House No., Street, Area"
                                    className={`${inputClass} sm:col-span-2`}
                                    required
                                />

                                <input
                                    name="landmark"
                                    value={addressForm.landmark}
                                    onChange={handleAddressChange}
                                    placeholder="Landmark (Optional)"
                                    className={inputClass}
                                />

                                <input
                                    name="city"
                                    value={addressForm.city}
                                    onChange={handleAddressChange}
                                    placeholder="City"
                                    className={inputClass}
                                    required
                                />

                                <input
                                    name="state"
                                    value={addressForm.state}
                                    onChange={handleAddressChange}
                                    placeholder="State"
                                    className={inputClass}
                                    required
                                />

                                <input
                                    name="pincode"
                                    type="text"
                                    pattern="[0-9]{6}"
                                    value={addressForm.pincode}
                                    onChange={handleAddressChange}
                                    placeholder="6-digit PIN Code"
                                    className={inputClass}
                                    required
                                />

                                <select
                                    name="type"
                                    value={addressForm.type}
                                    onChange={handleAddressChange}
                                    className={inputClass}
                                >
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <label className="flex items-center gap-3 mt-5 text-sm text-[#30283B]">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={addressForm.isDefault}
                                    onChange={handleAddressChange}
                                    className="accent-[#7652A5] w-4 h-4"
                                />
                                Make this my default address
                            </label>

                            <div className="flex flex-wrap gap-3 mt-7">
                                <button
                                    type="submit"
                                    className="bg-[#7652A5] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#5E3F89]"
                                >
                                    {editingAddressId ? "Update Address" : "Save Address"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowAddressForm(false)}
                                    className="border border-[#E9E0F5] text-[#77717F] px-6 py-3 rounded-xl text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6">
                        <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
                            <FiTrash2 size={22} />
                        </div>

                        <h3 className="text-lg font-bold text-[#30283B]">
                            Delete Address?
                        </h3>

                        <p className="text-sm text-[#77717F] mt-2">
                            Are you sure you want to remove this saved address?
                        </p>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={confirmDelete}
                                className="flex-1 bg-red-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-red-600"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 border border-[#E9E0F5] text-[#77717F] py-3 rounded-xl text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
