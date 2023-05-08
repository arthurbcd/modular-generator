import 'package:flutter_modular/flutter_modular.dart';

import '../data/template.dart';
import '../data/template_repository.dart';

/// [TemplateService] encapsulates all business logic of [Template].
class TemplateService extends Disposable {
  TemplateService(this._repository);
  final TemplateRepository _repository;

  // * States
  // final _template = Template().obn;
  // final _templates = <Template>[].obs;

  // * Getters
  // Template? get template => _template.value;
  // List<Template> get templates => _templates;

  /// Fetch [Template] by [id] from [TemplateRepository].
  Future<void> getTemplateById(int id) async {
    // _template.value = await _repository.getById(id);
  }

  /// Fetch all [Template] from [TemplateRepository].
  Future<void> getAllTemplates() async {
    // _templates.value = await _repository.getAll();
  }

  @override
  Future<void> dispose() async {
    //
  }
}
