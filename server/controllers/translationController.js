const Translation = require('../models/Translation');

// @desc    Get all available languages
// @route   GET /api/languages
// @access  Public
const getLanguages = async (req, res) => {
  try {
    const languages = await Translation.find()
      .select('languageCode languageName nativeName isEUOfficial')
      .sort({ languageCode: 1 });

    res.json({
      success: true,
      count: languages.length,
      data: languages
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching languages'
    });
  }
};

// @desc    Get translation by language code
// @route   GET /api/translations/:languageCode
// @access  Public
const getTranslation = async (req, res) => {
  try {
    const { languageCode } = req.params;

    const translation = await Translation.findOne({
      languageCode: languageCode.toUpperCase()
    });

    if (!translation) {
      return res.status(404).json({
        success: false,
        error: `Translation not found for language code: ${languageCode}`
      });
    }

    res.json({
      success: true,
      data: translation
    });
  } catch (error) {
    console.error('Error fetching translation:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching translation'
    });
  }
};

// @desc    Create new translation
// @route   POST /api/translations
// @access  Private (would be admin only in production)
const createTranslation = async (req, res) => {
  try {
    const translation = await Translation.create(req.body);

    res.status(201).json({
      success: true,
      data: translation
    });
  } catch (error) {
    console.error('Error creating translation:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Translation already exists for this language code'
      });
    }

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update translation
// @route   PUT /api/translations/:languageCode
// @access  Private (would be admin only in production)
const updateTranslation = async (req, res) => {
  try {
    const { languageCode } = req.params;

    const translation = await Translation.findOneAndUpdate(
      { languageCode: languageCode.toUpperCase() },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!translation) {
      return res.status(404).json({
        success: false,
        error: `Translation not found for language code: ${languageCode}`
      });
    }

    res.json({
      success: true,
      data: translation
    });
  } catch (error) {
    console.error('Error updating translation:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete translation
// @route   DELETE /api/translations/:languageCode
// @access  Private (would be admin only in production)
const deleteTranslation = async (req, res) => {
  try {
    const { languageCode } = req.params;

    const translation = await Translation.findOneAndDelete({
      languageCode: languageCode.toUpperCase()
    });

    if (!translation) {
      return res.status(404).json({
        success: false,
        error: `Translation not found for language code: ${languageCode}`
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting translation:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting translation'
    });
  }
};

module.exports = {
  getLanguages,
  getTranslation,
  createTranslation,
  updateTranslation,
  deleteTranslation
};
