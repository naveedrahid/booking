const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Permission name is required'],
        trim: true,
        unique: [true, 'Permission name must be unique'],
        minLength: [3, 'Permission name must be at least 3 characters'],
        maxLength: [50, 'Permission name must be less than 50 characters']
    },
    method: {
        type: String,
        required: [true, 'HTTP method is required'],
        enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    },
    route: {
        type: String,
        required: [true, 'Route path is required'],
        trim: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model.Permission || mongoose.model('Permission', permissionSchema);