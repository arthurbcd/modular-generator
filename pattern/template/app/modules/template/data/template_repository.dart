import '../data/template.dart';

/// [TemplateRepository] encapsulates all data processing of [Template].
class TemplateRepository {
  static const key = 'template';
  // TemplateRepository(this._api, this._box);

  // * Dependencies
  // final IApi _api;
  // final IBox _box;

  ///Get [Template] by [id] from api.
  Future<Template> getById(String id) async {
    return Template.fromMap({'íd': id});
  }

  ///Get all [Template] from api.
  Future<List<Template>> getAll() async {
    return [];
  }
}
